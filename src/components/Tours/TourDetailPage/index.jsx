import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiInstance from '../../../config/axios';
import Layout from '../../Layout';
import Button from '../../Button';
import Loader from '../../Loader';
import RichText from '../../RichText';
import { convertNumberToPersian, formatDate, formatPrice } from '../../../utils/formatters';
import './style.scss';
import defaultTourImg from 'src/assets/images/defaultTourImg.jpeg';

function ToursDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    apiInstance
      .get(`/tours/${id}`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => {
        console.log(error);
        navigate('/notFound');
      })
      .finally(() => setPageLoading(false));
  }, []);
  return (
    <Layout title="صفحه تور">
      {pageLoading && <Loader />}
      {!pageLoading && (
        <div className="tour-detail">
          <h1 className="tour-detail__title">{data.title}</h1>
          <img className="tour-detail__img" src={data.image || defaultTourImg} />
          <div className="tour-detail__date">
            <div className="tour-detail__start">تاریخ رفت: {formatDate(data.start_date)}</div>
            <div className="tour-detail__end">تاریخ برگشت: {formatDate(data.end_date)}</div>
          </div>
          <div className="tour-detail__capacity">ظرفیت تور: {convertNumberToPersian(data.capacity)} نفر</div>
          <div className="tour-detail__cost">قیمت تور: {formatPrice(convertNumberToPersian(data.cost))} تومان</div>
          <Button className="tour-detail__book">ثبت‌نام در تور</Button>
          {data.description && data.description !== '<p></p>' && (
            <>
              <div className="tour-detail__description">توضیحات تور:</div>
              <RichText
                readOnly
                editorClassName="tour-detail__description-editor"
                hideToolbar
                defaultContent={data.description}
              />
            </>
          )}
        </div>
      )}
    </Layout>
  );
}

export default ToursDetailPage;
