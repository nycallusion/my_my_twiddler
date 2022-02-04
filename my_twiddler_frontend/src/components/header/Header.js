import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/layout.scss';

export default function Header() {
    return (
      <div className="header">
        <div className="bar">
          <Link to="/" className="logo">
            <h1>MY TWIDDLER</h1>
          </Link>
          <a href="https://github.com/nycallusion/my_twiddler"><img src="https://mytwiddler.s3.amazonaws.com/users/GitHub-Logo.png" className='git-logo' alt="logo"/></a>
        </div>
      </div>
    );
  };
  