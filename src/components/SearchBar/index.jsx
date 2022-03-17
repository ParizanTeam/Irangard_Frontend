import React, { useState,useEffect } from 'react';
import ReactSearchBox from "react-search-box";
import SearchIcon from '../../assets/images/SearchIcon.png';
import HeadBanner from '../../assets/images/HeadBanner.jpg'
import './style.scss';

export default function SearchBar() {
  return (
    <div className='myBackg' dir='rtl'>
        <img src={HeadBanner} alt='headBanner' className='HeadB'/>
        <div className='SearchB'>
          <ReactSearchBox
          placeholder="جست و جو برای مقصد"
          data={[
              {
              key: "اصفهان",
              value: "اصفهان"
              },
              {
              key: "گیلان",
              value: "گیلان"
              },
              {
              key: "شیراز",
              value: "شیراز"
              },
              {
              key: "کیش",
              value: "کیش"
              },
              {
              key: "قشم",
              value: "قشم"
              }
          ]}
          //onSelect={(record: any) => console.log(record)}
          onFocus={() => {
              console.log("This function is called when is focussed");
          }}
          onChange={(value) => console.log(value)}
          autoFocus
          //leftIcon={<>⛱️</>}
          iconBoxSize="48px"
          />
        </div>
    </div>
  );
}
