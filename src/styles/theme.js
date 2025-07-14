import { createTheme } from '@mui/material/styles';

export const titanTheme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    titanGreen: {
      main: '#0b9c00',
      contrastText: '#fff',
    },
    error: {
      main: '#f57c00', 
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});