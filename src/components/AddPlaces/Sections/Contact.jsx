import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Checkbox from '@mui/material/Checkbox';
import Button from 'src/components/Button';
import { BasicInput } from '../Inputs';

function WorkTime() {
  const {
    register,
    resetField,
    watch,
    formState: { errors },
  } = useFormContext();

  const [day, setDay] = useState('Saturday');

  const handleDayChange = (event, newValue) => {
    setDay(newValue);
  };

  const days_label = {
    Saturday: 'شنبه',
    Sunday: 'یکشنبه',
    Monday: 'دوشنبه',
    Tuesday: 'سه شنبه',
    Wednesday: 'چهارشنبه',
    Thursday: 'پنجشنبه',
    Friday: 'جمعه',
  };

  const default_time_format = { all_day: false, start: 0, end: 0 };
  const default_days_time = {
    Saturday: default_time_format,
    Sunday: default_time_format,
    Monday: default_time_format,
    Tuesday: default_time_format,
    Wednesday: default_time_format,
    Thursday: default_time_format,
    Friday: default_time_format,
  };

  const [daysTime, setDaysTime] = useState(default_days_time);

  const handleChange = (day, key, value) => {
    console.log('days', daysTime);
    setDaysTime({ ...daysTime, [day]: { ...daysTime[day], [key]: value } });
  };

  return (
    <div>
      <TabContext value={day}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleDayChange} variant="scrollable">
            {Object.entries(days_label).map(([day, label]) => (
              <Tab label={label} value={day} />
            ))}
          </TabList>
        </Box>

        {Object.entries(daysTime).map(([day, time]) => (
          <TabPanel value={day}>
            <div>
              <Checkbox
                label="شبانه روزی"
                checked={time.all_day}
                onChange={e => handleChange(day, 'all_day', e.target.checked)}
              />
              شبانه روزی
            </div>

            <div className="work-time">
              <div className="work-time__field">
                <div>
                  <label htmlFor="start" className="field__label">
                    ساعت شروع
                  </label>
                  <input
                    disabled={time.all_day}
                    value={time.start}
                    onChange={e => handleChange(day, 'start', e.target.value)}
                    type="time"
                    className="field-input"
                    id="start"
                    placeholder="ساعت شروع"
                  />
                </div>
              </div>
              <div className="work-time__field">
                <div>
                  <label htmlFor="end" className="field__label">
                    ساعت پایان
                  </label>
                  <input
                    disabled={time.all_day}
                    value={time.end}
                    onChange={e => handleChange(day, 'end', e.target.value)}
                    type="time"
                    className="field-input"
                    id="end"
                    placeholder="ساعت پایان"
                  />
                </div>
              </div>
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}

export default function ContactSection(props) {
  const {
    trigger,
    setValue,
  } = useFormContext();

  const phone_validation = {
    pattern: {
      value: /[0-9]{2,14}$/i,
      message: 'شماره تلفن نامعتبر است.',
    },
  };
  const email_validation = {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'ایمیل نامعتبر است.',
    },
  };

  const website_validation = {
    pattern: {
      value:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      message: 'آدرس سایت نامعتبر است.',
    },
  };
  return (
    <div className="contact-section">
      <h1 className="title">اطلاعات تماس</h1>

      <BasicInput
        id="phone"
        label="تلفن"
        placeholder="شماره‌همراه یا تلفن مکان را وارد کنید"
        validation={phone_validation}
      />

      <BasicInput id="email" label="ایمیل" placeholder="ایمیل ارتباطی را وارد کنید" validation={email_validation} />

      <BasicInput id="website" label="سایت" placeholder="سایت مکان را وارد کنید" validation={website_validation} />

      <div className="basic-field worktime">
        <label htmlFor="worktime" className="field__label">
          ساعت کار
        </label>
        <WorkTime />
      </div>
      <Button
        variant="green"
        onClick={() => {
          trigger().then(isOkay => {
            if (isOkay) setValue('activeStep', 3);
          });
        }}
      >
        ادامه
      </Button>
    </div>
  );
}
