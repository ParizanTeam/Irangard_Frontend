import React from 'react';
import Helmet from 'react-helmet';
import Header from 'src/components/Header';
import {
  Container,
  Grid,
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import login_image from 'src/assets/images/main8.jpg';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import './style.scss';

const LoginPage = props => {
  const cacheRtl = createCache({
    key: 'muirtl',

    stylisPlugins: [rtlPlugin],

    prepend: true,
  });

  const steps = ['وارد کردن نام کاربری و ایمیل', 'تایید کد ایمیل شده', 'انتخاب رمز عبور'];

  return (
    <CacheProvider value={cacheRtl}>
      {/* <Header /> */}
      <Grid container className="signup__container">
        <Grid item lg={12} xs={12}>
          <Box className="signup__stepper">
            <Stepper activeStep={1} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              marginTop: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              ثبت نام
            </Typography>
            <Box component="form" sx={{ mt: 3 }} >
              <input name="username" placeholder="نام کاربری" id="username" className="signup__textfield" />
              <input className="signup__textfield" id="email" placeholder="ایمیل" name="email" />
              {/* <TextField margin="normal" required fullWidth name="username" label="نام کاربری" id="username" />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="ایمیل"
                name="email"
                autoComplete="email"
                autoFocus
              /> */}

              <Button type="submit" fullWidth className="signup__submit" sx={{ mt: 3, mb: 2 }}>
                ثبت نام
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{
                      textDecoration: 'none',
                      color: 'black',
                      mr: 0,
                      fontSize: '15px',
                    }}
                  >
                    {'قبلا ثبت نام کردی؟'}
                    <Button sx={{ color: 'rgb(76, 175, 80)', fontSize: '13px' }}>ورود</Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid item>
        <Box component="img" className="signup__image" alt="login image" src={login_image} />
      </Grid>
    </CacheProvider>
  );
};

export default LoginPage;
