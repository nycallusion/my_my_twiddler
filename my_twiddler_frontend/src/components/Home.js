import { React, useState,useEffect} from 'react';
import {io}  from "socket.io-client";
import TweetCard from './TweetCard';
import '../css/layout.scss';

// const ENDPOINT = "http://localhost:3001/";
const ENDPOINT = 'https://davidcodedesign.com/';



export default function Home() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
    socket.on("data", data => {
      setResponse(data);
    }); 
  },[]);


  return (
    <div className='feed'>
        {response.map((item, i) => (
          <TweetCard  key={item._id} item={item} data={response}/>
        ))}
    </div>
  );
};

