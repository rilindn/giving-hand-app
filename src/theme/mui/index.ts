// use default theme
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Lexend'
  },
  palette: {
    primary: {
      main: '#58BC8C'
    },
    secondary: {
      main: '#FF5E5E'
    },
    info: {
      main: '#c1c1c1'
    }
  }
});

export default theme;
