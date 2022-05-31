import React, { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import apiInstance from 'src/config/axios';
import {
  convertNumberToPersian,
  convertNumberToEnglish,
  isPersianNumber,
  convertJalaliDateToGeorgian,
  formatDate,
} from 'src/utils/formatters';
import './style.scss';
import 'react-multi-date-picker/styles/layouts/mobile.css';

function DiscountSystemTab() {
  const { id } = useParams();
  const [discountCodes, setDiscountCodes] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const [percentage, setPercentage] = useState('');
  const [percentageError, setPercentageError] = useState('');

  const [endDate, setEndDate] = useState(null);
  const [endDateBlured, setEndDateBlured] = useState(false);

  const [loading, setLoading] = useState(false);

  const endDatePickerRef = useRef(null);

  useEffect(() => {
    apiInstance
      .get(`/tours/${id}/discount-codes`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        setDiscountCodes(data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setPageLoading(false));
  }, []);

  const handlePercentageChange = e => {
    setPercentage(e.target.value);
    if (e.target.value === '') {
      setPercentageError('درصد تخفیف تور نمی‌تواند خالی باشد.');
    } else if (!isPersianNumber(convertNumberToPersian(e.target.value))) {
      setPercentageError('درصد تخفیف تور باید عدد باشد.');
    } else if (convertNumberToEnglish(e.target.value) <= 0 || convertNumberToEnglish(e.target.value) > 100) {
      setPercentageError('میزان کد تخفیف باید بین ۰ و ۱۰۰ باشد.');
    } else {
      setPercentageError('');
    }
  };

  const handleCodeChange = e => {
    setCode(e.target.value);
    if (e.target.value === '') {
      setCodeError('کد تخفیف نمی‌تواند خالی باشد.');
    } else {
      setCodeError('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setEndDateBlured(true);
    let error = false;
    if (e.target.value === '') {
      setCodeError('کد تخفیف نمی‌تواند خالی باشد.');
      error = true;
    }
    if (percentage === '') {
      setPercentageError('درصد تخفیف تور نمی‌تواند خالی باشد.');
      error = true;
    } else if (!isPersianNumber(convertNumberToPersian(percentage))) {
      setPercentageError('درصد تخفیف تور باید عدد باشد.');
      error = true;
    } else if (convertNumberToEnglish(percentage) <= 0 || convertNumberToEnglish(percentage) > 100) {
      setPercentageError('میزان کد تخفیف باید بین ۰ و ۱۰۰ باشد.');
      error = true;
    } else {
      setPercentageError('');
    }
    if (!endDate) {
      error = true;
    }
    if (error) {
      toast.error('لطفا فیلدهای مشخص‌شده را اصلاح کنید.');
      return;
    }
    const body = {
      code,
      off_percentage: convertNumberToEnglish(percentage),
      expire_date: convertJalaliDateToGeorgian(endDate.toString()) + `T00:00`,
      tour: id,
    };

    setLoading(true);

    apiInstance
      .post(`/tours/${id}/discount-codes/`, body)
      .then(res => res.data)
      .then(data => {
        toast.success('کد تخفیف با موفقیت اضافه شد.');
        console.log(data);
        setDiscountCodes(old => [...old, data]);
        setCode('');
        setEndDate(null);
        setPercentage('');
        setEndDateBlured(false);
      })
      .catch(error => {
        console.log(error);
        toast.error('مشکلی در سامانه رخ داده‌است.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="tour-dashboard-discounts">
      <Toaster />
      <h1 className="tour-dashboard-discounts__title">لیست تخفیف‌‌های تور</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="کد تخفیف:"
          placeholder="کد تخفیف..."
          value={code}
          onChange={handleCodeChange}
          onBlur={handleCodeChange}
          error={codeError}
        />
        <Input
          label="درصد تخفیف:"
          placeholder="درصد تخفیف..."
          value={convertNumberToPersian(percentage)}
          onChange={handlePercentageChange}
          onBlur={handlePercentageChange}
          error={percentageError}
        />
        <Input
          label="تاریخ انقضا:"
          autoComplete="off"
          onBlur={() => setEndDateBlured(true)}
          onFocus={() => endDatePickerRef.current.openCalendar()}
          onClick={() => endDatePickerRef.current.openCalendar()}
          placeholder="انتخاب تاریخ انقضا"
          type="text"
          id="end-date"
          value={endDate ? convertNumberToPersian(endDate.toString()) : ''}
          error={endDateBlured && !endDate && 'تاریخ انقضا نمی‌تواند خالی باشد.'}
        />
        <Button type="submit" className="tour-dashboard-discounts__add-btn" variant="green" disabled={loading}>
          افزودن کد تخفیف
        </Button>
        <DatePicker
          ref={endDatePickerRef}
          inputClass="date-input"
          className="rmdp-mobile"
          onChange={date => {
            setEndDate(date);
          }}
          calendar={persian}
          locale={persian_fa}
        />
      </form>
      {pageLoading && <div>در حال بارگیری کدها...</div>}
      {!pageLoading && <>{discountCodes.length === 0 && <div>هیچ کد تخفیفی پیدا نشد.</div>}</>}
      {!pageLoading && (
        <>
          {discountCodes.length > 0 && (
            <>
              <div className="tour-dashboard-discounts__code-card">
                <div className="tour-dashboard-discounts__code-card-title">عنوان</div>
                <div className="tour-dashboard-discounts__code-card-percent">درصد تخفیف</div>
                <div className="tour-dashboard-discounts__code-card-date">تاریخ انقضا</div>
              </div>

              {discountCodes.map(discountCode => (
                <div key={discountCode.id} className="tour-dashboard-discounts__code-card">
                  <div className="tour-dashboard-discounts__code-card-title">{discountCode.code}</div>
                  <div className="tour-dashboard-discounts__code-card-percent">
                    {convertNumberToPersian(discountCode.off_percentage)} درصد
                  </div>
                  <div className="tour-dashboard-discounts__code-card-date">{formatDate(discountCode.expire_date)}</div>
                  <Button
                    onClick={() => {
                      apiInstance
                        .delete(`/tours/${id}/discount-codes/${discountCode.id}/`)
                        .then(res => res.data)
                        .then(data => {
                          console.log(data);
                          toast.success('کد با موفقیت حذف شد.');
                          setDiscountCodes(old => old.filter(item => item.id !== discountCode.id));
                        })
                        .catch(error => {
                          console.log(error);
                          toast.error('مشکلی در سامانه رخ داده‌است.');
                        });
                    }}
                    className="tour-dashboard-discounts__code-card-delete"
                    variant="red"
                  >
                    حذف
                  </Button>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default DiscountSystemTab;
