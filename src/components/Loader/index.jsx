import React from 'react';
import loader from '../../assets/images/loader.gif';
import './style.scss';

function Loader() {
  return <img src={loader} alt="loading..." className="loader__loading" />;
}

export default Loader;
