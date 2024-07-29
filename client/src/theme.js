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
    fontFamily: 'Patrick Hand, Roboto, Arial',
    h1: {
      fontWeight: 'bold'
    },
    h2: {
      fontWeight: 'bold'
    },
    h3: {
      fontWeight: 'bold'
    },
    h4: {
      fontWeight: 'bold'
    }
  }
});

export default theme;