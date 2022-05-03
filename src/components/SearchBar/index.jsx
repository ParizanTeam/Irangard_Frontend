import React from 'react';
import searchBanner from 'src/assets/images/searchBanner.webp';
import './style.scss';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <img src={searchBanner} alt="nature" className="search-bar__img" />
      <input className="search-bar__search-box" placeholder="جست‌وجو برای مقصد..." />
    </div>
  );
};

export default SearchBar;
