import React,{useState}from 'react';
import '../css/layout.scss';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';
import TweetModal from './modal/TweetModal';
TimeAgo.addDefaultLocale(en);



export default function TweetCard({item,data}) {
  const [modal,
    setModal] = useState(false);
    const [filterData , setFilterData] = useState([])
  const {userName,message,timestamp} = item;

  const modalHandler = () => {
    modal ? setModal(false) : setModal(true)
  }

  const tweetModal = (userName) => {
    let filterDataByUserName = data.filter(item => item.userName === userName)
    setFilterData(filterDataByUserName);
    modalHandler();
  };

  return (
      <div className='tweet-card' onClick={() => tweetModal(userName)} >
          <div className='tweet-img-card'>
            <img className='tweet-img'src = 'https://assets.webiconspng.com/uploads/2017/01/Black-User-Graphic-Icon.png'/>
          </div>
          <div className='tweet-info'>
            <div className='tweet-user'>
              <div className='tweet-user-name'>
                {`@${userName}`}
              </div>
              <br/>
              <div className='tweet-time-ago'>
                Tweeted:{' '}
                <ReactTimeAgo date={timestamp*1} locale="en-US" timeStyle="twitter" />
                {' '}ago
              </div>
            </div>
            <div className='tweet-message'>
              <h5>
              {message}
              </h5>
                
            </div>
          </div>
          <TweetModal modal={modal} data={filterData} modalHandler={modalHandler}/>
      </div>
  );
};