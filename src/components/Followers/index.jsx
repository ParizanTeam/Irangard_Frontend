import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { Modal } from '@mui/material';
import Button from '../Button';
import './style.scss';

function Followers({ open, onClose, label }) {
  const demo = { name: 'Morteza', image: 'https://randomuser.me/api/portraits/men/15.jpg' };
  return (
    <div className="followers">
      <Modal open={open} onClose={onClose} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="followers-modal-content">
          <header className="followers-modal-content__header">
            <div className="followers-modal-content__close" onClick={onClose}>
              <RiCloseCircleLine size={24} />
              بستن
            </div>
            <h2 className="followers-modal-content__label">{label}</h2>
          </header>
          <div className="followers-modal-content__followers">
            {new Array(20).fill(null).map((_, index) => (
              <div key={index} className="followers-item">
                <div className="followers-item__info">
                  <img className="followers-item__img" src={demo.image} alt={demo.name} />
                  <div className="followers-item__username">{demo.name}</div>
                </div>
                <Button variant="blue" className="followers-item__follow-btn">
                  دنبال‌کردن
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Followers;
