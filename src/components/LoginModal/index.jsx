import React, { useState } from 'react';

import './style.scss';
import FooterImg from '../../assets/images/LoginBottom.png';
import { Button, Dialog, DialogContent } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { Tab, TabsList, TabPanel } from './CustomTabs';
import { Modal, Fade, Backdrop } from '@mui/material';
import { OpenInBrowser } from '@mui/icons-material';

const ConfirmModal = ({ onDiscardChanges, open, onClose }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="confirm-modal">
          <h4 className="confirm-modal__title">از تغییراتی که انجام دادید صرف‌نظر شود؟</h4>

          <div className="confirm-modal__buttons">
            <Button variant="contained" sx={{ ml: '8px' }} onClick={onClose}>
              ادامه ویرایش
            </Button>
            <Button variant="outlined" onClick={onDiscardChanges}>
              صرف‌نظر
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
export default function LoginModal({ open, handleClose }) {
  const [formIsDirty, setFormIsDirty] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const handleCloseLoginModal = (discardChanges=false) => {
    if (formIsDirty && !discardChanges) setShowWarning(true);
    if (!formIsDirty || discardChanges) handleClose();
  };

  return (
    <div>
      <Toaster />
      <Dialog open={open} onClose={() => handleCloseLoginModal()}>
        <DialogContent sx={{ overflowY: 'hidden', padding: '0px' }}>
          <ConfirmModal
            open={showWarning}
            onClose={() => setShowWarning(false)}
            onDiscardChanges={() => {
              setShowWarning(false)
              handleCloseLoginModal(true);
            }}
          />
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>ورود اعضا</Tab>
              <Tab>ثبت نام</Tab>
            </TabsList>
            <TabPanel value={0}>
              <LoginForm />
            </TabPanel>
            <TabPanel value={1}>
              <SignupForm handleFormIsDirty={setFormIsDirty} />
            </TabPanel>
            <img src={FooterImg} alt="Goodbye" className="FooterImg" />
          </TabsUnstyled>
        </DialogContent>
      </Dialog>
    </div>
  );
}
