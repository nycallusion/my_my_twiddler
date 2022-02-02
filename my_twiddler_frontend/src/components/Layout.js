import React, { useState } from 'react';
import Header from './header/Header';
import LeftBar from './bars/LeftBar';
import RightBar from './bars/RightBar';
import '../css/layout.scss';


export default function Layout(props) {

  
  return (
    <div className="Main">

      <Header />
      <div className="page-item">
        <LeftBar/>
        <div className="page-content">
          {props.children}
        </div>
      </div>

    </div>
  );
}
