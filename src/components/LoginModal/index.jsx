import React from 'react';
import './style.scss';
import FooterImg from '../../assets/images/LoginBottom.jpg';
import { Dialog, DialogContent } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { Tab, TabsList,TabPanel } from './CustomTabs';

export default function LoginModal() {
  const {formTitle,setFormTitle}= React.useState("");
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
            <TabPanel value={0}>
              <LoginForm setTitle={setFormTitle}/>
            </TabPanel>
            <TabPanel value={1}>
              <SignupForm setTitle={setFormTitle} />
            </TabPanel>
            <img src={FooterImg} alt="Goodbye" className="FooterImg" />
          </TabsUnstyled>
        </DialogContent>
      </Dialog>
    </div>
  );
}