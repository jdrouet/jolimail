import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#fafafa',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#4E84BF',
    },
    secondary: {
      main: '#BF574E',
    },
  },
});
