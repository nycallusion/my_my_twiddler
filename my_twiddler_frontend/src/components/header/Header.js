import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header({ loginHandler, logoutHandler }) {
    const token = useSelector(state => state.user.token);
 
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
  