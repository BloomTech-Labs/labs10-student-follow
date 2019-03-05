import { createMuiTheme } from '@material-ui/core/styles';

//REFRESHR Colors
//Background: #0b2742
//Background Contrast Text: #FFFFFF
//Cards: #FFFFFF
//Card Contrast Text:#0b2742
//breakpoint values {xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920}

export default createMuiTheme({
  typography: {
    htmlFontSize: 10,
    useNextVariants: true,
    body1: { color: 'inherit' }
  },
  palette: {
    primary: {
      main: '#0b2742',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#0b2742'
    },
    background: {
      default: '#0b2742',
      paper: '#0b2742'
    },
    tonalOffset: 0.2
  }
});
