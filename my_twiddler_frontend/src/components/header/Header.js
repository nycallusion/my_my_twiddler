import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header({ loginHandler, logoutHandler }) {
    const token = useSelector(state => state.user.token);
  
    // let main;
  
    // if (token) {
    //   main = (
    //     <React.Fragment>
    //       <Account logoutHandler={logoutHandler} />
    //       <Inbox />
    //     </React.Fragment>
    //   );
    // } else {
    //   main = (
    //     <React.Fragment>
    //       <LoginRegister loginHandler={loginHandler} />
    //     </React.Fragment>
    //   );
    // }
  
    return (
      <div className="header">
        <div className="bar">
          <Link to="/" className="logo">
            <h1>MY TWIDDLER</h1>
          </Link>
          {/* <div className="top-icons">{main}</div> */}
        </div>

      </div>
    );
  }
  