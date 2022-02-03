import React, { useState } from 'react';
import Header from './header/Header';
import LeftBar from './bars/LeftBar';
import '../css/layout.scss';


export default function Layout(props) {

  
  return (
    <div className='page'>
          <div className="Main">
      <Header />
      <div className="page-item">
        <LeftBar/>
        <div className="page-content">
          {props.children}
        </div>
      </div>

    </div>
    </div>

  );
};
