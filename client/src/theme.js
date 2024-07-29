import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#89CFF0',
    },
    secondary: {
      main: '#FC6A03',
    },
    background: {
        default: '#FED5A4',
    }
  },
  typography: {
    fontFamily: 'Patrick Hand, Roboto, Arial'
  }
});

export default theme;