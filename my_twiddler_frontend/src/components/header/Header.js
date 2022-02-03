import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/layout.scss';

export default function Header({ loginHandler, logoutHandler }) {
 
    return (
      <div className="header">
        <div className="bar">
          <Link to="/" className="logo">
            <h1>MY TWIDDLER</h1>
          </Link>
        </div>

      </div>
    );
  };
  