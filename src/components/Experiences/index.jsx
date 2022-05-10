import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import Loader from '../Loader';
import ExperiencesList from '../ExperiencesList';
import ExperienceFilters from '../ExperienceFilters';
import { baseUrl } from 'src/utils/constants';
import './style.scss';

function Experiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    await axios
      .get(`${baseUrl}/experiences/`)
      .then(res => res.data)
      .then(data => {
        console.log('data: ', data);
        setExperiences(data.results);
      })
      .catch(error => {
        console.log(error);
      });
    setLoading(false);
  }, []);

  return (
    <Layout title="تجربه‌ها">
      {loading && <Loader />}
      {!loading && <ExperienceFilters setExperiences={setExperiences} />}
      {!loading && <ExperiencesList experiences={experiences} />}
    </Layout>
  );
}

export default Experiences;
