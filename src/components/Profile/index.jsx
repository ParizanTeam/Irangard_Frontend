import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RiSettings5Line } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';
import { convertNumberToPersian } from '../../utils/formatters';
import Layout from '../Layout';
import { useGetProfile, usePutProfile } from '../../api/profile';
import './style.scss';

const Profile = () => {
  const { username: usernameQuery } = useParams();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const { isLoading, error, data } = useGetProfile(usernameQuery);
  const imageRef = useRef(null);
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const { followers, followings, full_name, email, username, about_me, profileImg } = formData;

  const handleOpen = () => {
    setEditProfileModalOpen(true);
  };
  const handleClose = () => {
    setEditProfileModalOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const body = new FormData();
    for (const key in formData) {
      body.append(key, formData[key]);
    }
    setUpdateLoading(true);
    usePutProfile(
      usernameQuery,
      body,
      error => {
        if (error.response.status === 400) {
          setErrors({ username: 'نام کاربری توسط شخص دیگری انتخاب شده‌است.' });
        } else {
          toast.error('مشکلی در سامانه رخ داده‌است.');
        }
        setUpdateLoading(false);
      },
      data => {
        console.log(data);
        setErrors({});
        setUpdateLoading(false);
        toast.success('اطلاعات با موفقیت تغییر یافت');
        setEditProfileModalOpen(false);
      }
    );
  };

  return (
    <Layout title={`پروفایل ${username}`}>
      <Toaster />
      <div className="profile">
        <div className="profile-summary">
          <div className="profile-summary__img">
            <img src={profileImg} alt={username} />
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
            <div className="edit-profile__img" onClick={() => imageRef.current.click()}>
              <img src={profileImg} />
              <input
                type="file"
                ref={imageRef}
                style={{ display: 'none' }}
                onChange={e => {
                  setFormData(old => ({
                    ...old,
                    image: e.target.files[0],
                    profileImg: URL.createObjectURL(e.target.files[0]),
                  }));
                }}
                accept="image/*"
              />
              <div className="edit-profile__img-edit">ویرایش</div>
            </div>
            <div className="edit-profile__form-control">
              <label htmlFor="name">نام و نام خانوادگی:</label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="نام و نام خانوادگی"
                value={full_name}
                onChange={e => setFormData(old => ({ ...old, full_name: e.target.value }))}
              />
            </div>
            <div className="edit-profile__form-control">
              <label htmlFor="username">نام کاربری:</label>
              <br />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="نام کاربری"
                value={username}
                onChange={e => setFormData(old => ({ ...old, username: e.target.value }))}
              />
              {errors.username && <p className="edit-profile__error-msg">{errors.username}</p>}
            </div>
            <div className="edit-profile__form-control">
              <label htmlFor="email">ایمیل:</label>
              <br />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="ایمیل"
                value={email}
                onChange={e => setFormData(old => ({ ...old, email: e.target.value }))}
                readOnly
              />
            </div>
            <div className="edit-profile__form-control">
              <label htmlFor="about">درباره من</label>
              <br />
              <textarea
                name="about"
                id="about"
                cols="30"
                rows="6"
                placeholder="درباره من"
                value={about_me}
                onChange={e => setFormData(old => ({ ...old, about_me: e.target.value }))}
              ></textarea>
            </div>
            <button className="edit-profile__save-btn" onClick={handleSubmit} disabled={updateLoading}>
              ثبت تغییرات
            </button>
            <button className="edit-profile__cancel-btn" onClick={handleClose} disabled={updateLoading}>
              انصراف
            </button>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Profile;
