import React from 'react';
import { Link } from 'react-router-dom';
import { RiMarkPenLine } from 'react-icons/ri';
import LoginModal from '../LoginModal';
import './style.scss';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <LoginModal open={open} handleClose={handleClose} />
      <div className="header__navbar" data-tetsid="main-navbar">
        <div className="header__navbar-container">
          <Link to="/" className="header__logo">
            ایران<span className="header__logo--green">گرد</span>
          </Link>
          <div className="header__navbar-left">
            <button className="header__write-btn">
              نوشتن تجربه
              <RiMarkPenLine size={24} />
            </button>
            <button className="header__signin-btn" onClick={() => setOpen(true)}>
              ورود
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
