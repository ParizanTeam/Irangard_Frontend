import React from "react";
import ReactDOM from "react-dom";
import Chart2 from './chart2';
import "./style.scss";
import { useState, useEffect, useRef } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {userData} from './userData.js';
import Chart3 from './chart3';


function Statics() {

  return (
    <div className='user-controller2'>
      <Box sx={{ flexGrow:2, margin:'35px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار سال
      </Typography>

      <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px'}} className='bordering'>
        <Chart2 data={userData} grid dataKey="Active User" title="User Analytics"/>
      </Box>
      </Box>
      <Chart3/>

    </div>
  );
}

export default Statics;
