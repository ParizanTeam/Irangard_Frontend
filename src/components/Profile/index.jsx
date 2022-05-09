import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { RiSettings5Line } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';
import ExperiencesList from '../ExperiencesList';
import Layout from '../Layout';
import { convertNumberToPersian } from '../../utils/formatters';
import { useGetProfile, usePutProfile } from '../../api/profile';
import './style.scss';
import { baseUrl } from '../../utils/constants';

const Profile = () => {
  const { username: usernameQuery } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const { isLoading, error, data } = useGetProfile(usernameQuery);
  const [experiences, setExperiences] = useState([]);
  const [experiencesLoading, setExperiencesLoading] = useState(false);
  if (error) {
    console.log('error', error.response);
    navigate('/notFound');
  }
  const imageRef = useRef(null);
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  useEffect(async () => {
    setExperiencesLoading(true);
    await axios
      .get(`${baseUrl}/experiences/?user__username=${usernameQuery}`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        setExperiences(data.results);
      })
      .catch(error => {
        console.log(error);
      });
    setExperiencesLoading(false);
  }, []);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const { followers, followings, full_name, email, username, about_me, profileImg, is_owner } = formData;

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
    <Layout title={`پروفایل ${username || ''}`}>
      {isLoading && (
        <div className="profile-skeleton">
          <div className="profile-summary-skeleton">
            <div className="profile-summary-skeleton__img-username">
              <div className="profile-summary-skeleton__img skeleton"></div>
              <div className="profile-summary-skeleton__username skeleton"></div>
            </div>
            <div className="profile-summary-skeleton__follow">
              <div className="profile-summary-skeleton__follow-item">
                <div className="profile-summary-skeleton__follow-title skeleton"></div>
                <span className="profile-summary-skeleton__follow-value skeleton"></span>
              </div>
              <div className="profile-summary-skeleton__follow-item">
                <div className="profile-summary-skeleton__follow-title skeleton"></div>
                <span className="profile-summary-skeleton__follow-value skeleton"></span>
              </div>
            </div>
            <div className="profile-summary-skeleton__edit-btn skeleton"></div>
          </div>
          <div className="profile-summary-skeleton__about">
            <div className="profile-summary-skeleton__about-title skeleton"></div>
            <div className="profile-summary-skeleton__about-desc skeleton"></div>
            <div className="profile-summary-skeleton__about-desc skeleton"></div>
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <Toaster />
          <div className="profile">
            <div className="profile-summary">
              <div className="profile-summary__img-username">
                <div className="profile-summary__img">
                  <img src={profileImg} alt={username} />
                </div>
                <p className="profile-summary__username">{username}</p>
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
              {is_owner && (
                <button className="profile-summary__edit" onClick={handleOpen}>
                  <span>ویرایش پروفایل</span>
                  <span>
                    <RiSettings5Line size={20} />
                  </span>
                </button>
              )}
            </div>
            {about_me && (
              <div className="profile-summary__about">
                <h3>درباره {full_name || 'من'}:</h3>
                <p>{about_me}</p>
              </div>
            )}
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
        </>
      )}
      {!experiencesLoading && <ExperiencesList experiences={experiences} />}
    </Layout>
  );
};

export default Profile;
