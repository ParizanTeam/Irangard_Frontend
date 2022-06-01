import React from 'react';
import Header from 'src/components/Header';
import searchBanner from 'src/assets/images/main5.png';
import './style.scss';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <img src={searchBanner} alt="nature" className="search-bar__img" />
      <Header/>
      <input className="search-bar__search-box" placeholder="جست‌وجو برای مقصد..." />
    </div>
  );
};

export default SearchBar;
