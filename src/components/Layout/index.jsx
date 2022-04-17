import React from 'react';
import Helmet from 'react-helmet';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './style.scss';

const Layout = ({ title = 'ایرانگرد', children }) => {
  return (
    <div className="layout">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <div className="layout__container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
