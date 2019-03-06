/* eslint-disable no-lone-blocks */
/* eslint-disable no-sequences */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Image from '../landingPage/LandingImage.jpg';
//import '../landingPage/LandingPage.css';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const style = (theme) => ({
  container: {
    width: '100%', 
    height: '100vh',
    marginTop: -64,
  },
  subcontainer: {
    width: '100%',
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
    width: '30%',
    textAlign: 'left',
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
    width: '100vw',
    marginTop: 64,
    height: '100vh',
  }

});

const LandingPage = props => {
  const { classes } = props
  return (
    <Grid container spacing={0} alignItems='stretch' className={classes.container}>
      <Card className={classes.subcontainer}>
        <CardContent className={classes.text}>
          <Typography variant='h1' gutterBottom className={classes.textH1} >Refreshr</Typography>
          <Typography variant='body2' className={classes.textP} >
            Send tests to your students over weeks or months. Help them learn
            for the long-term.
            </Typography>
        </CardContent>
        <CardMedia className={classes.backgroundImg} alt="desk with plant on it" image={Image} />
      </Card>
    </Grid>
  );
};

export default withRouter(withStyles(style)(LandingPage));



