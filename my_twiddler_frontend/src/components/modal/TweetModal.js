import {React} from 'react'
import { Modal } from 'react-responsive-modal';
import TweetModalCard from '../TweetModalCard';
import 'react-responsive-modal/styles.css';
import '../../css/modal.scss';

export default function TweetModal({modal,data,modalHandler}) {
    let userName
    if (data.length > 0) {
        userName =data[0].userName
    }

    return (
        <Modal
            className='tweet-modal'
            open={modal}
            onClose={modalHandler}
            showCloseIcon={false}
            >
            <div className='tweet-modal-header' >
                @{userName}
            </div>
            <div className='tweet-modal-content'>
            {data.map((item, i) => (
            <TweetModalCard  key={item._id} item={item}/>
            ))}
            </div>
        </Modal>
    );
};