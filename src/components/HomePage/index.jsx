import React from 'react';
import Helmet from 'react-helmet';
import Header from 'src/components/Header';
import CitySlider from 'src/components/CitySlider';
import Map from 'src/components/Map';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>ایرانگرد</title>
      </Helmet>
      <Header />
      <CitySlider />
      <Map />
    </>
  );
};

export default HomePage;
