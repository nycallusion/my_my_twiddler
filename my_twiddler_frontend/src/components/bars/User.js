import React,{useState} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import Alert from '@mui/material/Alert';
import { logout } from '../../store/reducer/userReducer';


export default function User(props) {
  const [tweet,
      setTweet] = useState('');
  const [errMsg,
      setErrMsg] = useState('');
  const [successMsg,
      setSuccessMsg] = useState('');
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  const handleTweetSubmit = async() => {
    setErrMsg('')
    setSuccessMsg('')
    if(tweet.length < 10 || tweet.length > 150) {
      return setErrMsg('Keep Tweets between 10 to 50 characters');
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tweet/create`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({message:tweet})
    });

    let jsonData = await response.json();
    //place error in  message
    if (jsonData.status === 'error') {
        setErrMsg(jsonData.message);
    } else {
        //set success message
        setTweet('')
        return setSuccessMsg('Tweet Sent')
    }
  };

    return (
      <div className="active-user" >
        <div className='logout-btn'>
          <button 
            className="btn"
            onClick={() => {
                dispatch(logout())
            }}
          >Logout </button>
        </div>

          <div className='tweet-box'>
          {errMsg && <Alert severity="error" className='alert'>{errMsg}</Alert>}
          {successMsg && <Alert severity="success" className='alert'>{successMsg}</Alert>}
            <form>
              <label>
                Tweet
                <textarea className="tweet-text-box" type="text" name="tweet" value={tweet} onChange={e => setTweet(e.target.value)} placeholder='Keep Tweets to under 150 characters'/>
              </label>
            </form>
            <button className='submit-btn' onClick={handleTweetSubmit}>submit</button>
          </div>
      </div>
    );
  };