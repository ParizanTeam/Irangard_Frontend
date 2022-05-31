import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfileImg from 'src/assets/images/profile.jpeg';
import './style.scss';

function TourAttendeesTab({ data }) {
  const navigate = useNavigate();
  return (
    <div className="tour-attendees">
      <h1 className="tour-attendees__title">لیست شرکت‌کنندگان</h1>
      {data.length === 0 && <div>هیچ شرکت‌کننده‌ای یافت نشد.</div>}
      <div className="tour-attendees__list">
        {data.length > 0 &&
          data.map(attendee => (
            <div
              key={attendee.username}
              onClick={() => navigate(`/profile/${attendee.username}`)}
              className="tour-attendees__attendee"
            >
              <img
                className="tour-attendees__attendee-img"
                src={attendee.image || defaultProfileImg}
                alt={attendee.username}
              />
              <div className="tour-attendees__attendee-name">{attendee.full_name || attendee.username}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TourAttendeesTab;
