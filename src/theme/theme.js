import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: 'iranyekan, Arial',
    },
    palette: {
      primary: { main: 'rgb(0,0,0)' },
    },
  })
);
