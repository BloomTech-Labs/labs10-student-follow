import { createMuiTheme } from '@material-ui/core/styles';

//REFRESHR Colors
//#195088 Navy blue (Background)
//#4C99E5 Ocean blue(Font)
//#FFFFFF white(card color)(nav)

  //breakpoint values {xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920}

export default createMuiTheme({
    typography: {
        htmlFontSize: 10,
        useNextVariants: true
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
    },
    
      
    
})