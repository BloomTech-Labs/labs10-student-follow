/* eslint-disable no-nested-ternary */

import React from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import MemoryRouter from 'react-router/MemoryRouter';
import { Typography } from '@material-ui/core';

export const breadcrumbNameMap = {
  '/classes': 'Classes',
  '/refreshrs': 'Refreshrs',
  '/classes/edit': 'Edit Class',
  '/classes/create': 'Create Classes',
  '/refreshrs/create': 'Create Refreshrs',
  '/billing': 'Billing'
};

const styles = theme => ({
  container: {
    top: 70,
    position: 'absolute',
    left: '1%',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start'
  },
  navRoutes: {
    fontSize: '1rem',
    color: theme.palette.primary.contrastText,
    display: 'block',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.secondary.dark
    }
  }
});


const Navcrumbs = (props) => {
  const { classes, location, history } = props;
  const paths = location.pathname.split('/').filter(path => path)

  // Use NoSsr to avoid SEO issues with the documentation website.
  return (
    <NoSsr>
      <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
        <div className={classes.container}>
                <Breadcrumbs
                  arial-label="Breadcrumb"
                  separator={
                    <NavigateNextIcon fontSize="small" color="secondary" />
                  }
                >
                  <Typography
                    className={classes.navRoutes} 
                    onClick={(e) => {e.preventDefault(); history.push('/dashboard')}}                 
                    style={{
                      display: `${location.pathname === '/' ? 'none' : 'flex'}`
                    }}
                  >
                    Dashboard
                  </Typography>
                  {paths.map((value, index) => {
                    const to = `/${paths.slice(0, index + 1).join('/')}`;
                    return (
                      <Typography
                        key={to}
                        className={classes.navRoutes}
                        onClick={(e) => {e.preventDefault(); history.push(to)}}
                      >
                        {breadcrumbNameMap[to]}
                      </Typography>
                    );
                  })}
                </Breadcrumbs>
        </div>
      </MemoryRouter>
    </NoSsr>
  );
};

export default withStyles(styles)(Navcrumbs);
