import {React, useState} from 'react'
import {useDispatch} from 'react-redux';
import Modal from 'react-modal'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import {setToken} from '../../store/reducer/userReducer';
import '../../css/modal.scss';

export default function LoginModal({openLogin, closeLoginHandler}) {
    const [email,
        setEmail] = useState('');
    const [password,
        setPassword] = useState('');
    const [errMsg,
        setErrMsg] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async() => {
        // validated on client side if field are filled
        if (!email || !password) {
            return setErrMsg('All field must be filled');
        }
        // send data to backend
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        await response.json().then(data => {
            if (data.status === 'error') {
                //place error in  message
                setErrMsg(data.message);
            } else {
                // set token and auto login
                dispatch(setToken({token: data.token, user_id: data.user, profilePic: data.profilePic}));
            }
        })
    }
    return (
        <Modal
            className='login-modal'
            isOpen={openLogin}
            ariaHideApp={false}>
            <div className='modal-header'>
                <h2>Login</h2>
                <span className='close-modal-btn' onClick={closeLoginHandler}>
                    <h2 className='close-x'>x</h2>
                </span>
            </div>
            <div className='modal-content'>
                {errMsg && <Alert className='alert' severity="error">{errMsg}</Alert>}
                <TextField
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                <hr/>
                <TextField
                    label="Password"
                    value={password}
                    type='password'
                    onChange={e => setPassword(e.target.value)}/>
            </div>
            <button className='btn' onClick={handleLogin}>
                <h2>Login</h2>
            </button>
        </Modal>
    );
};