import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Rating } from '@mui/material';
import { RiMapPinLine, RiHeartFill, RiTimeLine } from 'react-icons/ri';
import Layout from '../Layout';
import Comments from '../Comments';
import RichText from '../RichText';
import Loader from '../Loader';
import { convertNumberToPersian, formatDate } from '../../utils/formatters';
import { baseUrl } from 'src/utils/constants';
import defaultXpImg from '../../assets/images/defaultXpImg.png';
import './style.scss';

function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(async () => {
    await axios
      .get(`${baseUrl}/experiences/${id}`)
      .then(res => res.data)
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.log(error.response.status);
        if (error.response.status === 404) {
          navigate('/notFound');
        }
      });
    setLoading(false);
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      {!loading && (
        <div className="experience-detail">
          <h1 className="experience-detail__title">{data.title}</h1>
          <div className="experience-detail__place-rate">
            <p className="experience-detail__place">
              <RiMapPinLine size={20} />
              {data.place_title}
            </p>
            <div className="experience-detail__rating">
              <Rating dir="ltr" readOnly precision={0.1} defaultValue={data.rate} max={5} />
              <div className="experience-detail__rating-value">{convertNumberToPersian(data.rate)}</div>
            </div>
          </div>
          <div className="experience-detail__likes-date">
            <div className="experience-detail__date">
              <RiTimeLine size={20} />
              {formatDate(data.date_created)}
            </div>
            <div className="experience-detail__likes">
              <RiHeartFill size={20} />
              {convertNumberToPersian(data.like_number)}
            </div>
          </div>
          <img className="experience-detail__img" src={data.image || defaultXpImg} alt={data.title} />
          {data.summary && (
            <>
              <h2 className="experience-detail__title-2">خلاصه</h2>
              <p className="experience-detail__summary-body">{data.summary}</p>
            </>
          )}
          {data.body && (
            <>
              <h2 className="experience-detail__title-2">متن تجربه</h2>
              <RichText
                readOnly
                editorClassName="experience-detail__body-editor"
                hideToolbar
                defaultContent={data.body}
              />
            </>
          )}
          <Link to={`/profile/${data.user_username}`}>
            <div className="experience-detail__author-info">
              <img className="experience-detail__author-img" src={data.user_image} alt={data.user_username} />
              <p className="experience-detail__author-name">نوشته شده توسط {data.user_username}</p>
            </div>
          </Link>
          <Comments experienceId={id} />
        </div>
      )}
    </Layout>
  );
}

export default ExperienceDetail;
