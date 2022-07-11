import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TelegramIcon from '@mui/icons-material/Telegram';
import CommentIcon from '@mui/icons-material/Comment';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from 'src/utils/constants';
import tansferHistory from './data';
import apiInstance from '../../config/axios';
import './style.scss';
import { Button } from '@mui/material';
import { width } from '@mui/system';
import Statics from './statics';
import { SignupForm } from './AddUser';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';
function Generate(element) {
  if (element) {
    console.log(element);
    var myDate = new Date(element.date);
    return (
      <ListItem sx={{ backgroundColor: '#e1d4ed', marginBottom: '8px', borderRadius: '5px', padding: '6px' }}>
        {/*secondaryAction={*/}
        {/*} <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
            </IconButton>*/}
        <ListItemAvatar>
          <Avatar src={element.image} alt="recievedList" />
          {/*    <FolderIcon />
                  </Avatar>*/}
        </ListItemAvatar>
        {/* <div style={{ marginLeft: '30px', marginRight: '30px', textAlign: 'right' }}> */}
        <ListItemText
          primary={element.username}
          sx={{ marginRight: '30px', marginLeft: '30px', justifyContent: 'center' }}
        />
        {/* </div> */}
        {/* <div
          className="doNotShow"
          style={{ width: '130px', marginRight: '30px', marginLeft: '2px', textAlign: 'center' }}
        ></div> */}

        {/* <ListItemText sx={{ marginLeft: '40px' }} primary={element.friendsNum} /> */}
        <ListItemButton sx={{ justifyContent: 'left' }}>
          {/* <Button sx={{ marginLeft: '40px' }}> */}
          <CommentIcon color="secondary" />
          {/* </Button> */}
        </ListItemButton>

        <ListItemButton sx={{ justifyContent: 'left' }}>
          {/* <Button> */}
          <DeleteOutlineIcon color="secondary" />
          {/* </Button> */}
        </ListItemButton>
      </ListItem>
    );
  }
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function RecievedList() {
  //const [tansferHistory, setTansferHistory] = useState(null);
  const [diagramData, setDiagramData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState(null);
  const [nextLoading, setNextLoading] = useState(false);

  useEffect(async () => {
    await apiInstance
      .get(`/accounts/chat-users`)
      .then(res => res.data)
      .then(data => {
        console.log('data: ', data);
        setUsers(data);
        setNext(data.next || null);
      })
      .catch(error => {
        console.log(error);
      });
    setLoading(false);
  }, []);

  return (
    <div className="user-controller">
      <Box sx={{ flexGrow: 1, margin: '35px', backgroundColor: 'white' }}>
        <FormGroup row></FormGroup>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 4, mb: 2, color: '#011f1f' }} variant="h6" component="div">
            لیست چت‌ها
          </Typography>
          <Demo
            sx={{ padding: '5px', borderRadius: '5px', backgroundColor: 'white', height: '300px', overflowY: 'scroll' }}
          >
            <List>{users && users.map(item => Generate(item))}</List>
          </Demo>
        </Grid>
      </Box>
    </div>
  );
}
