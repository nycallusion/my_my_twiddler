import {React} from 'react'
import {Modal} from 'react-responsive-modal';
import TweetModalCard from '../TweetModalCard';
import 'react-responsive-modal/styles.css';
import '../../css/modal.scss';

export default function TweetModal({modal, data, modalHandler}) {
    let userName
    let profilePic
    if (data.length > 0) {
        userName = data[0].userName
        profilePic = data[0].profilePic
    }

    return (
        <Modal
            
            open={modal}
            onClose={modalHandler}
            showCloseIcon={false}>
            <div className='tweet-modal'>
                <div className='tweet-modal-header'>
                    <img src={profilePic} alt='Profile Pic'/>
                    @{userName}
                </div>
                <div className='tweet-modal-content'>
                    {data.map((item, i) => (<TweetModalCard key={item._id} item={item}/>))}
                </div>
            </div>

        </Modal>
    );
};