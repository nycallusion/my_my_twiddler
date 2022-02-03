import { React, useState,useEffect,useRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {io}  from "socket.io-client";
import TweetCard from './TweetCard';
import '../css/layout.scss';

const ENDPOINT = "http://localhost:4001/";



export default function Home() {
  const [response, setResponse] = useState([]);
  // const messagesEndRef = useRef(null)

  useEffect(() => {
    const socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    })
    socket.on("data", data => {
      console.log(data)
      if (response.length < 30){
        setResponse(data)
       
      }
      else if (data[data.length -1].timestamp !== response[response.length -1].timestamp){
        setResponse(data)
      }
    });
  }, []);


  return (
    <div className='feed'>
        {response.map((item, i) => (
          <TweetCard  key={item._id} item={item}/>
        ))}
    </div>
  );
};

