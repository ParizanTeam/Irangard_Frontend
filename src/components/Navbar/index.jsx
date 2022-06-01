import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { RiMarkPenLine } from 'react-icons/ri';
import LoginModal from '../LoginModal';
import ProfileMenu from 'src/components/ProfileMenu';
import useAuth from 'src/context/AuthContext';
import './style.scss';

const Navbar = ({}) => {
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();
  console.log('auth:', auth);
  const navigate = useNavigate();
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
            <button className="header__write-btn" onClick={() => navigate('/experiences/new')}>
              نوشتن تجربه
              <RiMarkPenLine size={24} />
            </button>
            <StyledEngineProvider injectFirst>
              <ProfileMenu/>
            </StyledEngineProvider>
            {!auth.isLoggedIn && (
              <button className="header__signin-btn" onClick={() => setOpen(true)}>
                ورود
              </button>
            )}
            {auth.isLoggedIn && (
              <button
                className="header__signin-btn"
                onClick={() => {
                  auth.logout();
                  window.location.reload(false);
                }}
              >
                خروج
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
