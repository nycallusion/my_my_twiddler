import {React, useState} from 'react'
import {Modal} from 'react-responsive-modal';
import {useDispatch, useSelector} from 'react-redux';
import {compressImageFile} from 'frontend-image-compress';
import 'react-responsive-modal/styles.css';
import '../../css/modal.scss';
import {updateUser} from '../../store/reducer/userReducer';
import Alert from '@mui/material/Alert';


export default function UploadModal({modal, modalHandler}) {
    const [selectedImage,
        setSelectedImage] = useState();
    const [errMsg,
        setErrMsg] = useState('');
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    // This function will be triggered when the file field change
    const imageChange = async (e) => {
        setErrMsg('')
        //check file size
        if (e.target.files[0].size > 5242880) {
            setSelectedImage()
            return setErrMsg('File is larger than 5MB')
        }
        // check if its image
        if(!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)){
            setSelectedImage()
            return setErrMsg('Please select valid image.')
        }
        if (e.target.files && e.target.files.length > 0) {
            //compress file
            const compressedFile = await compressImageFile(e.target.files[0],.1)
            setSelectedImage(compressedFile);
        }
    };
    const handleUploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append(
                'image',
                selectedImage
            );
            formData.append(
                'name',
                selectedImage.name
            );
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/update`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: formData,
              });
            let jsonData = await response.json(); 
            if (jsonData.status === 'error') {
                return setErrMsg(jsonData.message)
            };
            console.log(jsonData)
            dispatch(updateUser({profilePic:jsonData.profilePic}))
            setSelectedImage()
            modalHandler()

        }catch (err) {
            setErrMsg(err)
        }

    }

    return (
        <Modal
            className='upload-modal'
            open={modal}
            onClose={modalHandler}
            showCloseIcon={false}>
            {errMsg && <Alert className='alert' severity="error">{errMsg}</Alert>}
            <div className='container'>
                <input accept="image/*" type="file" onChange={imageChange}/> {selectedImage && (
                    <div className='preview'>
                        <img src={URL.createObjectURL(selectedImage)} className='image' alt="Thumb"/>
                        <button onClick={handleUploadImage} className='upload-btn' >
                            Upload
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};