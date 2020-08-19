import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
  },
  palette: {
    primary: {
      main: '#E84F83',
      contrastText: '#000',
    },
    secondary: {
      main: '#081229',
    },
    type: 'dark',
  },
});

theme = responsiveFontSizes(theme);

export default theme;
