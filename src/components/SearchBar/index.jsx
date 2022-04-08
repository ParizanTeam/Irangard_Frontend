import React from 'react';
import searchBanner from 'src/assets/images/searchBanner.webp';
import image from 'src/assets/images/main5.png';
import './style.scss';

const SearchBar = () => {
  return (
    <div className="search-bar">
      {/* <img src={searchBanner} alt="nature" className="search-bar__img" /> */}
      <img src={image} alt="nature" className="main-banner" />
      <input className="search-bar__search-box" placeholder="جست‌وجو برای مقصد..." />
    </div>
  );
};

export default SearchBar;
