import { React, useState,useEffect} from 'react';
import {io}  from "socket.io-client";
import TweetCard from './TweetCard';
import '../css/layout.scss';

// end point for socket io
const ENDPOINT = `${window.location.hostname}/`


export default function Home() {
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "my-custom-header"
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

