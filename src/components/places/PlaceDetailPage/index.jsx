import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import Layout from '../../Layout';
import PlaceGallery from '../PlaceGallery';
import PlaceContactInfo from '../PlaceContactInfo';
import PlaceTags from '../PlaceTags';
import RoomsList from '../RoomsList';
import PlaceCosts from '../PlaceCosts';
import Loader from '../../Loader';
import { useGetPlace } from '../../../api/place';
import { convertNumberToPersian } from '../../../utils/formatters';
import './style.scss';

const props = {
  name: 'سیب ۳۶۰',
};
const PlaceDetailPage = () => {
  const { name } = props;
  const params = useParams();
  const { placeId } = params;

  const { error, isLoading, data } = useGetPlace(placeId);
  if (error) {
    return <Navigate to={'/notFound'} />;
  }

  return (
    <Layout>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="place-detail">
          <header className="place-detail__header">
            <h2>{data.title}</h2>
            <div className="place-detail__rating">
              <Rating dir="ltr" readOnly defaultValue={data.rate} max={5} />
              <div className="place-detail__rating-value">{convertNumberToPersian(data.rate)}</div>
            </div>
          </header>
          <div className="place-detail__gallery-info-wrapper">
            <PlaceGallery className="place-detail__gallery" images={data.images} />
            <PlaceContactInfo className="place-detail__info" info={data.contact} />
          </div>
          <div className="place-detail__body">
            <h3 className="place-detail__about-title">درباره {name}</h3>
            <p className="place-detail__about-description">{data.description}</p>
            <PlaceTags tags={data.tags} />
            {data.rooms && <RoomsList rooms={data.rooms} />}
            <PlaceCosts costs={data.optional_costs} isFree={data.is_free} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PlaceDetailPage;
