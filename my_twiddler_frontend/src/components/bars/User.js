import React from 'react';
import { useDispatch} from 'react-redux';
import { logout } from '../../store/reducer/userReducer';


export default function User(props) {
  const dispatch = useDispatch();

    return (
        <div>
            <button 
            className="btn"
            onClick={() => {
                dispatch(logout())
            }}
            >Logout </button>
    </div>
    );
  }