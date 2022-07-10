import React, { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';
import { usePutProfile } from '../../api/profile';
import defaultProfileImg from '../../assets/images/avatar.png';

function EditProfileModal({ open, setOpen, formData, setFormData, usernameQuery, initialData }) {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const imageRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const body = new FormData();
    for (const key in formData) {
      body.append(key, formData[key]);
    }
    if (typeof body.get('image') == 'string') {
      body.delete('image');
    }
    setUpdateLoading(true);
    usePutProfile(
      usernameQuery,
      body,
      error => {
        toast.error('مشکلی در سامانه رخ داده‌است.');
        setUpdateLoading(false);
      },
      data => {
        console.log(data);
        setErrors({});
        setUpdateLoading(false);
        toast.success('اطلاعات با موفقیت تغییر یافت');
        setOpen(false);
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="modal"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: 'auto' }}
    >
      <form className="edit-profile">
        <h2>ویرایش پروفایل</h2>
        <div className="edit-profile__img" onClick={() => imageRef.current.click()}>
          <img src={formData.profileImg || formData.image || defaultProfileImg} />
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
            value={formData.full_name}
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
            value={formData.username}
            onChange={e => setFormData(old => ({ ...old, username: e.target.value }))}
            readOnly
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
            value={formData.email}
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
            cols={30}
            rows={6}
            placeholder="درباره من"
            value={formData.about_me}
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
  );
}

export default EditProfileModal;
