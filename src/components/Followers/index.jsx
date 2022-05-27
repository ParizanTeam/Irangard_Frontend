import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { Modal } from '@mui/material';
import FollowerItem from '../FollowerItem';
import './style.scss';

function Followers({ open, onClose, label, people }) {
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
            {people && people.map((person, index) => <FollowerItem key={index} person={person} />)}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Followers;
