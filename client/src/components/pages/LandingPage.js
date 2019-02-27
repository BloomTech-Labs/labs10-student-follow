/* eslint-disable no-sequences */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Image from '../landingPage/LandingImage.jpg';
import MobileImage from '../landingPage/mobile-img.jpg';
import '../landingPage/LandingPage.css';
import OtherNavBar from '../common/OtherNavBar';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const style = (theme) => ({
  container: {
    height: `calc(100vh - ${64}px)`,
    width: '100vw',
    overflow: 'hidden',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '100vw'
    },

  },
  subcontainer: {
    position: 'absolute',
    width: '100vw',
    margin: 0,
    padding: 0
  },
  text: {
    position: 'absolute',
    zIndex: 100,
    top: 140,
    left: '12%',
  },
  textH1: {
    fontSize: '4rem',
    fontWeight: 'bold',
    fontFamily: 'Arial, Helvetica, sans-serif',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '3.2rem'
    },
  },
  textP: {
    fontSize: '1.6rem',
    width: '35%',
    paddingLeft: 40,
    paddingTop: 10,
    fontFamily: 'Arial, Helvetica, sans-serif',
    lineHeight: 1.5,
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '50%',
      fontSize: '1.4rem'
    },
  },
  backgroundImg: {
    zIndex: -1,
    width: '100vw',
    height: '100vh',
    marginTop: 0,

  }

});

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const LandingPage = props => {
  const { classes } = props
  return (
    <Grid container spacing={40} alignItems='stretch' className={classes.container}>
      <div className={classes.subcontainer}>
        <div className={classes.text}>
          <Typography variant='h1' gutterBottom className={classes.textH1} >Refreshr</Typography>
          <Typography variant='body1' className={classes.textP} >
            Send tests to your students over weeks or months. Help them learn
            for the long-term.
            </Typography>
        </div>
      </div>
      <img className={classes.backgroundImg} alt="desk with plant on it" src={Image} />
    </Grid>
  );
};

export default withRouter(withStyles(style)(LandingPage));

//Will add tomorrow
          {/* </p> */}
          {/* <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
          >
            Create Refreshr
          </Button>
        </div>
      </div>
      <LazyLoadImage className="background-img" alt="image" src={Image} />
      <LazyLoadImage className="mobile-img" alt="image" src={MobileImage} />
    </div>
  );
};

export default withStyles(styles)(LandingPage); */}
          
