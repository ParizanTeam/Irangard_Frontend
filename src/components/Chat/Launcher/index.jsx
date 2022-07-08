import React from 'react';
import { useState } from 'react';
import openLauncher from '../assets/launcher_button.svg';
import './style.scss';

function Launcher(props) {
  return (
    <div>
      <button type="button" className={'rcw-launcher'}>
        <img src={openLauncher} className="rcw-open-launcher" alt="launcher" />
      </button>
    </div>
  );
}

export default Launcher;
