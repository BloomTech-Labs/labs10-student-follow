import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { TakeMoney } from '../index.js';
import { Elements, StripeProvider } from 'react-stripe-elements';

const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 64,
    width: '100%',
  },
  header: {
    color: theme.palette.primary.contrastText,
  },
  cardDiv:{
    display: 'flex',
    width: '100%',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      flexFlow: 'row nowrap',
      alignItems: 'stretch',

    }
  },
  card: {
    background: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.secondary.main}`,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    width: '80%',
    margin: '0 0 10%',
    [theme.breakpoints.up('md')]: {
      margin: '0 1%',
      width: '100%',
      justifyContent:'space-between'

    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  cardHeader: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    textAlign: 'center'
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  pricingDiv: {
    display: 'flex',
    justifySelf: 'flex-start',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '0 50'
  },
  priceText: {
    color: theme.palette.primary.contrastText,
  },
  cardText: {
    color: theme.palette.primary.contrastText,
    fontSize: '1rem',
    textAlign: 'center'
  },
  cardActions: {
    width: '75%',
    bottom: 0
  },
  tooltip: {
     background: 'none',
     color: theme.palette.primary.contrastText,
  }
});

const tiers = [
  {
    title: 'Standard',
    price: '9.99',
    value: 999,
    description: [
      'Up to 500 Refreshrs',
      'Unlimited teachers',
      'Fixed scheduling',
      'Email support'
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 999
  },
  {
    title: 'Premium',
    value: 2999,
    price: '29.99',
    description: [
      'Unlimited Refreshrs',
      'Customize scheduling',
      '24/7 Phone support',
      '30-day free trial'
    ],
    buttonText: 'Get started',
    buttonVariant: 2999
  },
  {
    title: 'Custom',
    price: '50+',
    description: [
      'Unlimited Refreshrs',
      'Custom solution',
      'Tailored to your school',
      'In-person support'
    ],
    buttonText: 'Contact us',
    buttonVariant: 'custom'
  }
];

const Pricing = props => {
  const { classes } = props;

  return (
    <>
      <Grid container spacing={40} className={classes.container}>
          <Typography
            className={classes.header}
            variant="h3"
            align="center"
            gutterBottom
          >
            Pricing
          </Typography>
          <Grid
              item
              className={classes.cardDiv}
            >
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
          
              <Card
              key={tier.title}
              className={classes.card}>
                <CardHeader
                  title={tier.title}
                  action={tier.title === 'Premium' ? <Tooltip title='Popular' classes={{tooltip:classes.tooltip}} placement='top'><StarIcon /></Tooltip> : null}
                  className={classes.cardHeader}
                />
                <CardContent className={classes.content}>
                  <div className={classes.pricingDiv}>
                    <Typography variant="h4" className={classes.priceText}>
                      ${tier.price} 
                    </Typography>
                    <Typography variant="body2" className={classes.priceText}> /mo </Typography>
                  </div>  
                  {tier.description.map(line => (
                    <Typography variant="subtitle2" className={classes.cardText} align='center' key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <StripeProvider apiKey="pk_test_6uEhds8mHz26DG95ZvUwTURp">
                    <Elements>
                      <TakeMoney
                        variant={tier.buttonVariant}
                        subType={tiers.value}
                      />
                    </Elements>
                  </StripeProvider>
                  `
                </CardActions>
              </Card>
          ))}
          </Grid>
      </Grid>
    </>
  );
};

Pricing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles, { withTheme: true })(Pricing));