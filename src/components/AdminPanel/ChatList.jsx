import React from 'react';
import Sidebar from './Sidebar';
import ChatUsersList from './ChatUsersList';
import UsersList from './UsersList';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Statics from './statics';
import Typography from '@mui/material/Typography';
import './style.scss';
import { baseUrl } from 'src/utils/constants';

function AdminPanel() {
  return (
    <div className="bg" style={{ backgroundColor: '#0f0026' }}>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main" style={{ backgroundColor: '#0f0026', width: '100%', minHeight: '100vh' }}>
        <div className="panel-header"></div>
        <div className="body">
          {/* <UsersList /> */}
          <ChatUsersList />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
