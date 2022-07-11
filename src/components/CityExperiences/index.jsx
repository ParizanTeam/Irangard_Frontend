import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import Loader from '../Loader';
import ExperiencesList from '../ExperiencesList';
import ExperienceFilters from '../ExperienceFilters';
import { baseUrl } from 'src/utils/constants';
import Button from '../Button';
import { useParams } from 'react-router-dom';
import './style.scss';

function CityExperiences() {
  const { city } = useParams();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState(null);
  const [nextLoading, setNextLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(async () => {
    await axios
      .get(`${baseUrl}/experiences/?size=10&place__contact__city=${city}`)
      .then(res => res.data)
      .then(data => {
        console.log('data: ', data);
        setExperiences(data.results);
        setNext(data.next || null);
      })
      .catch(error => {
        console.log(error);
      });
    setLoading(false);
  }, []);

  const loadMoreExperiences = async () => {
    setNextLoading(true);
    await axios
      .get(next.replace('http://127.0.0.1:8000', baseUrl))
      .then(res => res.data)
      .then(data => {
        console.log('data: ', data);
        setExperiences(old => [...old, ...data.results]);
        setNext(data.next || null);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setNextLoading(false);
      });
  };

  return (
    <Layout title={`تجربه‌های شهر ${city}`}>
      {loading && <Loader />}
      {!loading && <ExperiencesList experiences={experiences} city={city} />}
      {!loading && next && (
        <div className={'experiences__load-more-wrapper'}>
          <Button onClick={loadMoreExperiences} className={'experiences__load-more'} disabled={nextLoading}>
            موارد بیشتر...
          </Button>
        </div>
      )}
    </Layout>
  );
}

export default CityExperiences;
