import React from 'react';
import { Link } from 'react-router-dom';
import { RiMarkPenLine } from 'react-icons/ri';
import './style.scss'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          ایران<span className="navbar__logo--green">گرد</span>
        </Link>
        <div className="navbar__left">
          <button className="navbar__write-btn">
            نوشتن تجربه
            <RiMarkPenLine size={24} />
          </button>
          <button className="navbar__signin-btn" onClick={() => setOpen(true)}>
            ورود
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
