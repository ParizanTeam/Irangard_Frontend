import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import apiInstance from '../../config/axios';
import Experiences from '../Experiences';
import { Navigate } from 'react-router-dom';
import ExperiencesList from '../ExperiencesList';
import Layout from '../Layout';
import Loader from '../Loader';
import './style.scss';

function Feed() {
  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    apiInstance
      .get('/experiences/feed')
      .then(res => res.data)
      .then(data => {
        console.log('feed: ', data);
        setExperiences(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (!loading && experiences.length === 0) {
    return <Navigate to={'/experiences'} replace />;
  }

  return (
    <Layout title="تجربه‌های پیشنهادی من">
      {loading && <Loader />}
      {!loading && <ExperiencesList experiences={experiences} label="تجربه‌های پیشنهادی" />}
    </Layout>
  );
}

export default Feed;
