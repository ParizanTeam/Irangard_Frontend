import React from 'react';
import Helmet from 'react-helmet';
import Header from 'src/components/Header';
import CitySlider from 'src/components/CitySlider';
import IranMap from 'src/components/IranMap';
import SearchBar from 'src/components/SearchBar/index';
import ExperienceSlider from 'src/components/ExperienceSlider/index';
import Footer from 'src/components/Footer';
import Testimonial from 'src/components/Testimonial';
import PlaceContactInfo from '../places/PlaceContactInfo';
import PlaceGallery from '../places/PlaceGallery';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>ایرانگرد</title>
      </Helmet>
      <PlaceGallery />
      <PlaceContactInfo />
      <Header />
      <SearchBar />
      <CitySlider />
      <IranMap />
      <Testimonial />
      <ExperienceSlider />
      <Footer />
    </>
  );
};

export default HomePage;
