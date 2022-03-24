import React from 'react';
import './style.scss';
import HeaderImg from '../../assets/images/loginHead.jpg';
import HeaderImg2 from '../../assets/images/loginHead2.jpg';
import FooterImg from '../../assets/images/LoginBottom.jpg';
import { Dialog, DialogContent } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { Tab, TabsList,TabPanel } from './CustomTabs';

export default function LoginModal() {
  return (
    <div>
      <Toaster />
      <Dialog open={true}>
        <DialogContent sx={{ overflowY: 'hidden', padding: '0px' }}>
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>ورود</Tab>
              <Tab>ثبت نام</Tab>
            </TabsList>
            <div className="myHeader">
              <img src={HeaderImg} alt="Hello" className="HeaderImg" />
              <img src={HeaderImg2} alt="Hello" className="HeaderImg" />
            </div>

            <TabPanel value={0}>
              <LoginForm />
            </TabPanel>
            <TabPanel value={1}>
              <SignupForm />
            </TabPanel>
            <img src={FooterImg} alt="Goodbye" className="FooterImg" />
          </TabsUnstyled>
        </DialogContent>
      </Dialog>
    </div>
  );
}
