import React from 'react';
import { Link } from 'react-router-dom';
import { RiMarkPenLine, RiRestaurantLine, RiHome3Line, RiChatQuoteLine, RiShipLine } from 'react-icons/ri';
import './style.scss';
import LoginModal from '../LoginModal';

const Header = () => {
  const [open,setOpen]=React.useState(false);
  const handleClose=()=>{
    setOpen(false);
  }
  return (
    <>
      <LoginModal open={open} handleClose={handleClose} />
      <div className="header__navbar">
        <div className="header__navbar-container">
          <Link to="/" className="header__logo">
            ایران<span className="header__logo--green">گرد</span>
          </Link>
          <div className="header__navbar-left">
            <button className="header__write-btn">
              نوشتن تجربه
              <RiMarkPenLine size={24} />
            </button>
            <button className="header__signin-btn" onClick={() => setOpen(true)}>ورود</button>
          </div>
        </div>
      </div>
      <div className="header__nav-items-wrapper">
        <Link to="/restaurants" className="header__nav-item">
          <div>رستوران‌ها</div>
          <RiRestaurantLine size={24} />
        </Link>
        <Link to="/residences" className="header__nav-item">
          <div>اقامتگاه‌ها</div>
          <RiHome3Line size={24} />
        </Link>
        <Link to="tours" className="header__nav-item">
          <div>تورها</div>
          <RiShipLine size={24} />
        </Link>
        <Link to="experiences" className="header__nav-item">
          <div>تجربه‌ها</div>
          <RiChatQuoteLine size={24} />
        </Link>
      </div>
    </>
  );
};

export default Header;
