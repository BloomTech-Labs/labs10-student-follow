import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Image from '../landingPage/LandingImage.jpg';
import MobileImage from '../landingPage/mobile-img.jpg';
import '../landingPage/LandingPage.css';
import OtherNavBar from '../common/OtherNavBar';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const style = {
  position: 'absolute',
  width: '100%',
  margin: 0,
  padding: 0
};

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const LandingPage = props => {
  const { classes } = props;
  return (
    <div className="container">
      <div style={style}>
        <OtherNavBar />
        <div className="text">
          <h1>Refreshr</h1>
          <p>
            Send tests to your students over weeks or months. Help them learn
            for the long-term.
          </p>
          <Button
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

export default withStyles(styles)(LandingPage);
