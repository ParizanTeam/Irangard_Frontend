import React, { useState } from 'react';
import apiInstance from '../../config/axios';
import Button from '../Button';
import useAuth from '../../context/AuthContext';
import './style.scss';
import defaultProfileImg from '../../assets/images/profile.jpeg';
import { Link, useNavigate } from 'react-router-dom';

function FollowerItem({ person }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(person.following);
  const [loading, setLoading] = useState(false);
  const showFollow = following !== null && person.username !== auth?.user?.username;
  const handleFollow = e => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    if (following) {
      apiInstance
        .post(`/accounts/${person.id}/unfollow/`)
        .then(res => res.data)
        .then(data => {
          setFollowing(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      apiInstance
        .post(`/accounts/${person.id}/follow/`)
        .then(res => res.data)
        .then(data => {
          setFollowing(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div
      className="followers-item"
      onClick={() => {
        navigate(`/profile/${person.username}`);
        location.reload();
      }}
    >
      <div className="followers-item__info">
        <img className="followers-item__img" src={person.image || defaultProfileImg} alt={person.name} />
        <div className="followers-item__username">{person.username}</div>
      </div>
      {showFollow && (
        <Button
          disabled={loading}
          onClick={handleFollow}
          className="followers-item__follow-btn"
          variant={following ? 'white' : 'blue'}
        >
          {following ? 'دنبال‌شده' : 'دنبال‌کردن'}
        </Button>
      )}
    </div>
  );
}

export default FollowerItem;
