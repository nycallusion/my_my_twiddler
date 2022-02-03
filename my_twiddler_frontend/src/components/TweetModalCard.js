import React,{useState}from 'react';
import '../css/layout.scss';
import ReactTimeAgo from 'react-time-ago';




export default function TweetModalCard({item}) {
  const {userName,message,timestamp} = item;
  return (
      <div className='tweet-modal-card' >
          <div className='tweet-modal-info'>
            <div className='tweet-modal-user'>
              <div className='tweet-modal-time-ago'>
                Tweeted:{' '}
                <ReactTimeAgo date={timestamp*1} locale="en-US" timeStyle="twitter" />
                {' '}ago
              </div>
            </div>
            <div className='tweet-modal-message'>
              <h5>
              {message}
              </h5>
            </div>
          </div>
      </div>
  );
};