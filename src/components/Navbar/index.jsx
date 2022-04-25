import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiMarkPenLine } from 'react-icons/ri';
import LoginModal from '../LoginModal';
import './style.scss';

const Navbar = ({}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);
  useEffect(() => {
    const access_token = localStorage.getItem('access-token') || '';
    if (!access_token) {
      setIsNotLoggedIn(true);
    }
    // TODO: check jwt validity
    // const body = {
    //   token: 'JWT ' + access_token,
    // };
    // axios.post(`${baseUrl}/accounts/auth/jwt/verify`, body).then(res => console.log(res));
  }, []);
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
            {isNotLoggedIn && (
              <button className="header__signin-btn" onClick={() => setOpen(true)}>
                ورود
              </button>
            )}
            {!isNotLoggedIn && (
              <button
                className="header__signin-btn"
                onClick={() => {
                  localStorage.removeItem('access-token');
                  localStorage.removeItem('refresh-token');
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
