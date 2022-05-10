import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { MdLocationPin, MdOutlineLocationOn, MdSearch } from 'react-icons/md';
import { IconContext } from 'react-icons';
import Footer from 'src/components/Footer';
import PlaceCards from 'src/components/PlaceCards';
import IranStates from 'src/assets/data/IranStates.json';
import './style.scss';

const PlaceFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [placeType, setPlaceType] = useState(searchParams.get('place_type') || 'all');
  const [state, setState] = useState(searchParams.get('state') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [cities, setCities] = React.useState([]);
  const [q, setQ] = useState(searchParams.get('q') || '');

  const greenTheme = createTheme({
    palette: {
      primary: {
        main: '#00aa6c',
      },
    },
    typography: {
      fontFamily: 'iranyekan, Arial',
    },
  });

  const handleTabChange = (event, newValue) => {
    setPlaceType(newValue);
    let d = searchParams;
    if (newValue === 'all') {
      d.delete('place_type');
    } else {
      d.set('place_type', newValue);
    }
    setSearchParams(d);
  };

  return (
    <ThemeProvider theme={greenTheme}>
      <IconContext.Provider value={{ color: '#00aa6c', size: '1.3em' }}>
        <div className="search-places">
          <div className="search-places__header">
            <div className="search-places__filters">
              <div className="green-field">
                <MdSearch className="icon" />
                <input
                  autoComplete="off"
                  className="field-input"
                  type="text"
                  id="mainSearch"
                  value={q}
                  onChange={e => {
                    let v = e.target.value;
                    setQ(v);
                    let d = searchParams;
                    d.set('q', v);
                    setSearchParams(d);
                  }}
                  placeholder="جست‌و‌جو برای مقصد..."
                />
              </div>

              <div className="state-city">
                <div className="state-city__field">
                  <Autocomplete
                    disablePortal
                    options={IranStates}
                    value={state}
                    onChange={(event, newValue) => {
                      setState(newValue);
                      fetch(`assets/data/cities/${newValue.value}.json`).then(res =>
                        res.json().then(x => setCities(x))
                      );
                      setCity(null);
                    }}
                    renderInput={params => (
                      <div ref={params.InputProps.ref} className="green-field">
                        <MdOutlineLocationOn className="icon" />

                        <input
                          {...params.inputProps}
                          autoComplete="off"
                          className="field-input"
                          type="text"
                          id="state"
                          placeholder="استان را انتخاب کنید."
                        />
                      </div>
                    )}
                  />
                </div>
                <div className="state-city__field">
                  <Autocomplete
                    disabled={!state}
                    value={city}
                    onChange={(event, newValue) => {
                      setCity(newValue);
                    }}
                    options={cities}
                    renderInput={params => (
                      <div ref={params.InputProps.ref} className="green-field">
                        <MdLocationPin className="icon" />

                        <input
                          {...params.inputProps}
                          className="field-input"
                          type="text"
                          id="city"
                          autoComplete="off"
                          placeholder="شهر را انتخاب کنید."
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div>
                <button className="search-btn">
                  <p>بگرد</p>
                </button>
              </div>
            </div>
            <div className="search-places__tabs">
              <Tabs value={placeType} onChange={handleTabChange} variant="scrollable">
                <Tab label="همه نتایج" value="all" />
                <Tab label="رستوران‌ها" value="0" />
                <Tab label="اقامتگاه‌ها" value="1" />
                <Tab label="مراکز تفریحی" value="2" />
                <Tab label="جاذبه‌های‌دیدنی" value="3" />
              </Tabs>
            </div>
          </div>

          <div>
            <PlaceCards />
          </div>
          <Footer />
        </div>
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export default PlaceFilters;
