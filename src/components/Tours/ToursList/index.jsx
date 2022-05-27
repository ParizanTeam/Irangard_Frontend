import React, { useEffect, useState } from 'react';
import Layout from 'src/components/Layout';
import Loader from 'src/components/Loader';
import apiInstance from '../../../config/axios';
import TourCard from '../TourCard';
import './style.scss';

function ToursList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [next, setNext] = useState(null);
  useEffect(() => {
    apiInstance
      .get('/tours')
      .then(res => res.data)
      .then(data => {
        console.log(data);
        setData(data.results);
        setNext(data.next);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Layout title="لیست تورها">
      {loading && <Loader />}
      {!loading && (
        <div className="tours-list">
          <h1 className="tours-list__title">لیست تورها</h1>
          <div className="tours-list__tours">
            {data.map((tour, index) => (
              <TourCard key={index} tour={tour} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ToursList;
