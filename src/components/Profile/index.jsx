import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RiSettings5Line } from 'react-icons/ri';
import { convertNumberToPersian } from '../../utils/formatters';
import Layout from '../Layout';
import profileImg from '../../assets/images/profile.jpeg';
import './style.scss';
import { Modal } from '@mui/material';

const Profile = () => {
  const { username } = useParams();
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const { followers = 0, followings = 0, profile = profileImg } = {};
  const handleOpen = () => {
    setEditProfileModalOpen(true);
  };
  const handleClose = () => {
    setEditProfileModalOpen(false);
  };
  return (
    <Layout title={`پروفایل ${username}`}>
      <div className="profile">
        <div className="profile-summary">
          <div className="profile-summary__img">
            <img src={profile} alt={username} />
          </div>
          <div className="profile-summary__follow">
            <div className="profile-summary__followers">
              دنبال‌کنندگان
              <span>{convertNumberToPersian(followers)}</span>
            </div>
            <div className="profile-summary__followings">
              دنبال‌شوندگان
              <span>{convertNumberToPersian(followings)}</span>
            </div>
          </div>
          <button className="profile-summary__edit" onClick={handleOpen}>
            <span>ویرایش پروفایل</span>
            <span>
              <RiSettings5Line size={20} />
            </span>
          </button>
        </div>
        <Modal
          open={editProfileModalOpen}
          onClose={handleClose}
          className="modal"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: 'auto' }}
        >
          <form className="edit-profile">
            <h2>ویرایش پروفایل</h2>
            <div className="edit-profile__img">
              <img src={profile} alt="" />
              <div className="edit-profile__img-edit">ویرایش</div>
            </div>
            <div className="edit-profile__form-control">
              <label htmlFor="name">نام و نام خانوادگی:</label>
              <br />
              <input type="text" id="name" name="name" placeholder="نام و نام خانوادگی" />
            </div>
            <div className="edit-profile__form-control">
              <label htmlFor="username">نام کاربری:</label>
              <br />
              <input type="text" id="username" name="username" placeholder="نام کاربری" />
            </div>
            <div className="edit-profile__form-control">
              <label htmlFor="email">ایمیل:</label>
              <br />
              <input type="text" id="email" name="email" placeholder="ایمیل" />
            </div>
            <div className="edit-profile__form-control">
              <label htmlFor="about">درباره من</label>
              <br />
              <textarea name="about" id="about" cols="30" rows="6" placeholder="درباره من"></textarea>
            </div>
            <button className="edit-profile__save-btn">ثبت تغییرات</button>
            <button className="edit-profile__cancel-btn" onClick={handleClose}>
              انصراف
            </button>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Profile;
