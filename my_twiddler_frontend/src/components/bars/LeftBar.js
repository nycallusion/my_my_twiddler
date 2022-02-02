import React from 'react';
import {useSelector } from 'react-redux';
import NoUser from './NoUser';
import User from './User';


export default function LeftBar(props) {
  // const user = useSelector(state => state.user.user_id)
  const token = useSelector(state => state.user.token);

  let panel;

  if(token) {
    panel = <User/> ;
  }else {
    panel = <NoUser />;
  }
  
  
  return (
    <div className="left-bar">
      {panel}
    </div>
  );
};