import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState} from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import tansferHistory from './data';
import './style.scss';
import { Button } from '@mui/material';
import { width } from '@mui/system';
import Statics from './statics';
import {SignupForm} from './AddUser';
function Generate(element) {
  if (element) {
    var myDate = new Date(element.date); 
    return (
      <ListItem className='bordering'
        sx={{ backgroundColor: 'white', marginBottom: '8px', borderRadius: '5px', padding: '6px' }}
      >
        {/*secondaryAction={*/}
        {/*} <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
            </IconButton>*/}
        <ListItemAvatar>
          <Avatar src={element.userImgSrc} alt="recievedList" />
          {/*    <FolderIcon />
                  </Avatar>*/}
        </ListItemAvatar>
        <div style={{width:'155px',marginRight: '30px',textAlign:'right'}}>
        <ListItemText primary={element.Name} sx={{margin:'auto',justifyContent:'center'}}/></div>
        <div className='doNotShow' style={{width:'130px',marginRight: '30px',marginLeft: '2px',textAlign:'center'}}>
        <ListItemText primary={element.userName} sx={{margin:'auto',justifyContent:'center'}}/></div>
        
        <ListItemText sx={{ marginLeft: '40px' }} primary={element.friendsNum}/>
        <Button>
            <DeleteOutlineIcon color="primary"/>
        </Button>
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
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    axios
      .get(`${baseUrl}/accounts/instructors/orders/`)
      .then(res => {
        setTansferHistory(res.data);
        console.log('TansferHistory', res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);*/

  return (
    <div className='user-controller'>
      <Box sx={{ flexGrow:2, margin:'35px' }} >
        <Typography sx={{ mt: 4, mb: 2 ,color:'#011f1f'}} variant="h6" component="div">
            اضافه کردن کاربر جدید
        </Typography>
        
        <Box sx={{ backgroundColor: 'white', marginBottom: '15px', borderRadius: '5px', padding: '6px',paddingBottom:'20px'}} className='bordering'>
          <SignupForm/>
        </Box>
    </Box>
    <Box sx={{ flexGrow: 1, margin:'35px',backgroundColor: 'white'}}>
      <FormGroup row></FormGroup>
      <Grid item xs={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2 , color:'#011f1f'}} variant="h6" component="div">
          لیست کاربران
        </Typography>
        <Demo sx={{padding:'5px',borderRadius:'5px',backgroundColor: 'white',height:'300px',overflowY:'scroll'}}>
          <List>{tansferHistory && tansferHistory.map(item => Generate(item))}</List>
        </Demo>
      </Grid>
    </Box>
    </div>
  );
}
