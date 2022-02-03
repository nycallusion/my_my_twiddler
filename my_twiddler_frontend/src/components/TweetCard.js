import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../css/layout.scss';



export default function TweetCard({item}) {

  console.log(item)
  const {userName,message} = item
  return (
      <div className='tweet-card'>
          <div >
            <img className='tweet-img'src = 'https://assets.webiconspng.com/uploads/2017/01/Black-User-Graphic-Icon.png'/>
          </div>
          <div className='tweet-info'>
            <div className='tweet-user'>
                {userName}
            </div>
            <div className='tweet-message'>
                {message}
            </div>
          </div>
      </div>
        
  );
};