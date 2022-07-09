import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./style.scss";
// ref: https://www.pluralsight.com/guides/drawing-charts-in-react-with-d3
// 數據顯示: https://openbase.io/js/recharts
// ref: https://livecodestream.dev/post/2020-08-08-7-react-chart-libraries-for-your-web-projects/
// lib source: https://recharts.org/
import { data1, CustomizedDot } from "./option1";
import data2 from "./option2";
import data3 from "./option3";
import data4 from "./option4";
import { data5, renderActiveShape } from "./option5";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  ComposedChart,
  PieChart,
  Pie,
  Sector
} from "recharts";

export default function App() {
  const [activeIndexState, setState] = useState(0);
  return (
    <div className="App">
      <div className="user-controller">
      <Box sx={{ flexGrow:2, margin:'35px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار کلی
      </Typography>

      <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px',justifyContent:'center'}} className='make-center bordering'>
        <br/>
      <LineChart className="be-center"
        width={500}
        height={300}
        data={data1}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          //dot={<CustomizedDot />}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      </Box>
      </Box>

      <Box sx={{ flexGrow:2, margin:'35px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار فرد به فرد
      </Typography>

      <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px'}} className='make-center bordering'>
        <br/>
      <BarChart className="be-center"
        width={500}
        height={300}
        data={data3}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
      </BarChart>
      </Box>
      </Box>
      
      
      
      
      </div>
      


      <div className="user-controller">
      <Box sx={{ flexGrow:2, margin:'35px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار کلی
      </Typography>

      <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px'}} className='make-center bordering'>
        <br/>
      <AreaChart className="be-center"
        width={500}
        height={400}
        data={data2}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
      </Box>
      </Box>
      
      <Box sx={{ flexGrow:2, margin:'35px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار روزانه
      </Typography>

      <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px'}} className='make-center bordering'>
        <br/>
      <ComposedChart className="be-center"
        width={500}
        height={400}
        data={data4}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
      </Box>
      </Box>

      
      
      </div>
        {/*
      <br />
      <div className="user-controller">
      <Box sx={{ flexGrow:2, margin:'35px',width:'420px'}} >
      <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          آمار سال
      </Typography>

      <Box sx={{ backgroundColor: '#dbd0ee', marginBottom: '15px', borderRadius: '5px', padding: '6px',width:'400px'}} >
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndexState}
          activeShape={renderActiveShape}
          data={data5}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={(data, index) => {
            console.log("data", index);
            setState(index);
          }}
        />
      </PieChart>
      </Box>
      </Box>
        </div>*/}
    </div>
  );
}
