import React from 'react';
import Helmet from 'react-helmet';
import Header from 'src/components/Header';
import CitySlider from 'src/components/CitySlider';
import Map from 'src/components/Map';
import SearchBar from '../SearchBar/index';
import ExperienceSlider from '../ExperienceSlider/index'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>ایرانگرد</title>
      </Helmet>
      <Header />
      <SearchBar/>
      <CitySlider />
      <Map />
      <ExperienceSlider/>
    </>
  );
};

export default HomePage;
