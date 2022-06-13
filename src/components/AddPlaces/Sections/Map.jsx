import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from 'src/components/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useMediaQuery } from '@mui/material';
import Map from 'src/components/Map';
import IranStates from 'src/assets/data/IranStates.json';
import { BasicInput } from '../Inputs';
export default function MapSection(props) {
  const { watch, setValue, trigger, resetField } = useFormContext();
  const useMobile = () => useMediaQuery('(max-width: 470px)');
  const [cities, setCities] = useState([]);

  const street_validation = {
    maxLength: {
      value: 25,
      message: 'آدرس خیابان باید کمتر از ۲۵ کارکتر باشد.',
    },
  };

  const handleChangeLocation = e => {
    setValue('latitude', e.lat);
    setValue('longitude', e.lng);
  };

  const handleIsOptionEqualToValue = (option, val) => {
    if (val) {
      if (val.label != option.label) return false;
    }
    return true;
  };
  return (
    <div className="map-section">
      <h1 className="title">نقشه</h1>
      <div className="location-info">
        <div className="state-city-address">
          <div className="state-city">
            <div className="state-city__field">
              <label htmlFor="state">استان</label>
              <Autocomplete
                disablePortal
                options={IranStates}
                value={watch('state')}
                isOptionEqualToValue={handleIsOptionEqualToValue}
                onChange={(event, newValue) => {
                  setValue('state', newValue);
                  fetch(`assets/data/cities/${watch('state').value}.json`).then(res =>
                    res.json().then(x => setCities(x))
                  );
                  resetField('city');
                }}
                renderInput={params => {
                  return (
                    <div ref={params.InputProps.ref}>
                      <BasicInput
                        inputProps={{ ...params.inputProps }}
                        id="state"
                        placeholder="استان را انتخاب کنید."
                        validation={{ required: true }}
                      />
                    </div>
                  );
                }}
              />
            </div>
            <div className="state-city__field">
              <label htmlFor="city">شهر</label>
              <Autocomplete
                disabled={!watch('state')}
                value={watch('city')}
                onChange={(event, newValue) => {
                  setValue('city', newValue);
                }}
                isOptionEqualToValue={handleIsOptionEqualToValue}
                options={cities}
                renderInput={params => {
                  return (
                    <div ref={params.InputProps.ref}>
                      <BasicInput
                        inputProps={{ ...params.inputProps }}
                        id="city"
                        placeholder="شهر را انتخاب کنید."
                        validation={{ required: true }}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </div>

          <BasicInput
            id="street"
            label="آدرس خیابان"
            placeholder="آدرس خیابان و پلاک ساختمان را اینجا وارد کنید."
            validation={street_validation}
          />

          <h3 className="coordinates__title">مختصات مکان</h3>
          <div className="coordinates">
            <div className="coordinates__field">
              <BasicInput id="latitude" label="عرض" placeholder="عرض مکان" validation={{ required: true }} />
            </div>
            <div className="coordinates__field">
              <BasicInput id="longitude" label="طول" placeholder="طول مکان" validation={{ required: true }} />
            </div>
          </div>
        </div>
        <div className="location-info__map">
          {watch('city') && (
            <Map
              style={useMobile && { width: 350, height: 350 }}
              onChoose={handleChangeLocation}
              defaultLat={watch('city')?.lat}
              defaultLong={watch('city')?.long}
            />
          )}
        </div>
      </div>

      <Button
        variant="green"
        onClick={() => {
          trigger().then(isOkay => {
            if (isOkay) setValue('activeStep', 2);
          });
        }}
      >
        ادامه
      </Button>
    </div>
  );
}
