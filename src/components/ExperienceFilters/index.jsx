import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from 'src/utils/constants';
import Button from '../Button';
import Input from '../Input';
import './style.scss';

function ExperienceFilters({ setExperiences }) {
  const [textSearch, setTextSearch] = useState('');
  const [placeSearch, setPlaceSearch] = useState('');
  const [textSearchLoading, setTextSearchLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setTextSearchLoading(true);
    await axios
      .get(`${baseUrl}/experiences/?search=${textSearch}&place__title__contains=${placeSearch}`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        setExperiences(data.results);
      })
      .catch(error => {
        console.log(error);
      });
    setTextSearchLoading(false);
  };

  return (
    <div className="filters">
      <form className="filters__search-box" onSubmit={handleSubmit}>
        <Input
          placeholder="جستجو در عنوان و متن..."
          label="جستجو بر اساس عنوان و متن:"
          value={textSearch}
          onChange={e => setTextSearch(e.target.value)}
        />

        {/* TODO: handle more filters */}
        <Input
          placeholder="جستجو در مکان..."
          label="جستجو بر اساس مکان:"
          value={placeSearch}
          onChange={e => setPlaceSearch(e.target.value)}
        />
        <Button type="submit" variant="blue" className="filters__search-btn" disabled={textSearchLoading}>
          جستجو
        </Button>
      </form>
    </div>
  );
}

export default ExperienceFilters;
