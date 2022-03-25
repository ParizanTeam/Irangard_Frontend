import React from 'react';
import Helmet from 'react-helmet';
import Header from 'src/components/Header';
import CitySlider from 'src/components/CitySlider';
import Map from 'src/components/Map';
import SearchBar from 'src/components/SearchBar/index';
import ExperienceSlider from 'src/components/ExperienceSlider/index';
import Footer from 'src/components/Footer';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>ایرانگرد</title>
      </Helmet>
      <Header />
      <SearchBar />
      <CitySlider />
      <Map />
      <ExperienceSlider />
      <Footer />
    </>
  );
};

export default HomePage;
