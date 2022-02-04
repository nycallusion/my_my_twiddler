import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import {useDispatch} from 'react-redux';
import {setToken} from '../../store/reducer/userReducer';
import LoginModal from '../modal/LoginModal';

export default function NoUser(props) {
    const [userName,
      setUserName] = useState('');
    const [email,
        setEmail] = useState('');
    const [password,
        setPassword] = useState('');
    const [errMsg,
        setErrMsg] = useState('');
    const [openLogin,
        setOpenLogin] = useState(false);
    const dispatch = useDispatch();
    const closeLoginHandler = () => setOpenLogin(false);
    const openLoginHandler = () => setOpenLogin(true);

    const handleRegister = async() => {
        // validated on client side if field are filled
        if (!email || !password || !userName) {
            return setErrMsg('All field must be filled');
        }
        if(userName.length < 5 || userName.length > 15){
          return setErrMsg('User Name Have to be 5 to 15 character');
        }
        // send data to backend
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password,userName})
        });

        let jsonData = await response.json();
        //place error in  message
        if (jsonData.status === 'error') {
            setErrMsg(jsonData.message);
        } else {
            // set token and auto login
            dispatch(setToken({token: jsonData.token, user_id: jsonData.user, profilePic: jsonData.profilePic}));
        }
    }

    return (
        <div className="no-user">
            {errMsg && <Alert severity="error" className='alert'>{errMsg}</Alert>}
            <div className='register'>
                <TextField
                    className='text-field'
                    label="UserName"
                    value={userName}
                    size='small'
                    type='text'
                    onChange={e => setUserName(e.target.value)}/>
                <TextField
                    className='text-field'
                    label="Email"
                    value={email}
                    size='small'
                    type='email'
                    onChange={e => setEmail(e.target.value)}/>

                <TextField
                    className='text-field'
                    label="Password"
                    value={password}
                    size='small'
                    type='password'
                    onChange={e => setPassword(e.target.value)}/>
                <button className="btn" onClick={handleRegister}>Register</button>
            </div>

            <div className='login'>
                Have An Account?
                <button onClick={openLoginHandler} className="btn">Login</button>
            </div>
            <LoginModal closeLoginHandler={closeLoginHandler} openLogin ={openLogin}/>
        </div>

    );
};