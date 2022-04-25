import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './style.scss';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';

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
