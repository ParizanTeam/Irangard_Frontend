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
import Navbar from 'src/components/Navbar';
import { useMobile } from 'src/utils/hooks';

import { Checkbox, MenuItem, Select, Switch, Chip, TextField } from '@mui/material';

const mockFeatures = [
  'امکانات برگزاری جلسات و ضیافت',
  'امکانات ویژه برای معلولان',
  'جکوزی',
  'استخر سرپوشیده',
  'باربیکیو',
  'استخر',
  'صندوق امانات',
  'میز بیلیارد',
  'سالن بدنسازی',
];

const mockRooms = {
  1: '‏۱ نفر',
  2: '‏۲ نفر',
  3: '‏۳ نفر',
  4: '‏۴ نفر',
};
const Filters = ({ isHotel, isFree }) => {
  // /places/?city=کیش&place_type=1&tags__name=چای&features__title=سرویس بهداشتی&rooms__capacity=2&rate__gte=3
  const default_filter = {
    is_free: false,
    tags__name: '',
    features__title: '',
    rooms__capacity: null,
    rate: [],
  };
  const [filter, setFilter] = useState(default_filter);
  const [entryFee, setEntryFee] = useState(null);
  const [rate, setRate] = useState({ 5: false, 4: false, less3: false });

  const isMobile = useMobile();

  const handleChange = (f, newValue) => {
    setFilter({ ...filter, [f]: newValue });
    let d = searchParams;
    if (newValue === '') {
      d.delete(f);
    } else {
      d.set(f, newValue);
    }
    setSearchParams(d);
  };

  return (
    <div className="place-filters">
      <div className="summary-result">
        <div>نمایش ۱۰ از ۸۰ مکان</div>
        <div>لغو فیلتر ها</div>
      </div>
      <div>
        <label>امتیاز</label>

        <div className="rate-filter">
          <button
            onClick={() => {
              setRate({ ...rate, ['less3']: !rate['less3'] });
            }}
            className={`rate-filter__btn ${rate['less3'] && 'is-checked'}`}
          >
            کمتر از 3 ستاره
          </button>

          <button
            onClick={() => {
              setRate({ ...rate, [4]: !rate[4] });
            }}
            className={`rate-filter__btn ${rate[4] && 'is-checked'}`}
          >
            4 ستاره
          </button>
          <button
            onClick={() => {
              setRate({ ...rate, [5]: !rate[5] });
            }}
            className={`rate-filter__btn ${rate[5] && 'is-checked'}`}
          >
            5 ستاره
          </button>
        </div>
      </div>

      {isHotel && (
        <div>
          <label>امکانات</label>
          {mockFeatures.map((f, i) => (
            <div>
              <Checkbox
                label={f}
                key={i}
                // checked={time.all_day}
                // onChange={e => handleChange(day, 'all_day', e.target.checked)}
              />
              {f}
            </div>
          ))}
        </div>
      )}

      {isHotel && (
        <div>
          <label>ظرفیت اتاق</label>

          <Select
            displayEmpty
            value={filter['rooms__capacity']}
            onChange={e => handleChange('rooms__capacity', e.target.value)}
            renderValue={selected => {
              return selected ? mockRooms[selected] : 'انتخاب کنید';
            }}
          >
            {Object.entries(mockRooms).map(([val, label], i) => (
              <MenuItem value={val} key={i}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}

      <div>
        <Checkbox checked={filter['is_free']} onChange={e => handleChange('is_free', e.target.checked)} />
        <label>رایگان باشد.</label>
      </div>
      {/* 
      {isFree && (
        <div>
          <label>هزینه ورودی: </label>
          {filter["is_free"] && 'دارد (پولی)'}
          {!filter["is_free"] && 'ندارد (رایگان)'}

          <Switch checked={filter["is_free"]} onChange={e => handleChange("is_free",e.target.checked)} />
        </div>
      )} */}

      {
        <div style={{ marginTop: '30px' }}>
          <label>تگ ها</label>

          <Autocomplete
            multiple
            id="tags-filled"
            freeSolo
            options={[]}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip dir="ltr" variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={params => (
              <TextField sx={{ bgcolor: 'white' }} {...params} placeholder="تگ های مکان را انتخاب کنید." />
            )}
          />
        </div>
      }
    </div>
  );
};
const PlaceFilters = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [placeType, setPlaceType] = useState(searchParams.get('place_type') || 'all');
  const [state, setState] = useState(searchParams.get('state') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [cities, setCities] = useState([]);
  const [q, setQ] = useState(searchParams.get('q') || '');
  const isMobile = useMobile();

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
      <Navbar />
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

          <div className="search-places__main">
            {!isMobile && <Filters isHotel={placeType == 1} isFree={placeType >= 2} />}
            <PlaceCards className="search-places__result" />
          </div>
          <Footer />
        </div>
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export default PlaceFilters;
