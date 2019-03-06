/* eslint-disable no-nested-ternary */

import React from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import NoSsr from '@material-ui/core/NoSsr';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import MemoryRouter from 'react-router/MemoryRouter';
import Route from 'react-router/Route';
import { Link as RouterLink, withRouter } from 'react-router-dom';

export const breadcrumbNameMap = {
  '/refreshrs': 'Refreshrs',
  '/classes': 'Classes',
  '/refreshrs/create': 'Create Refreshrs',
  '/classes/create': 'Create Classes',
  '/billing': 'Billing'
};

const styles = theme => ({
  root: {
    top: 70,
    position: 'absolute',
    left: '1%',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
  },
  links: {
    fontSize: '1rem',
    color: theme.palette.primary.contrastText,
    display: 'block',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.secondary.dark
    }
  }
});

const Navcrumbs = props => {
  const { classes, location } = props;

  // Use NoSsr to avoid SEO issues with the documentation website.
  return (
    <NoSsr>
      <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
        <div className={classes.root}>
          <Route>
            {() => {
              const pathnames = location.pathname
                .split('/')
                .filter(path => path);

              return (
                <Breadcrumbs
                  arial-label="Breadcrumb"
                  separator={<NavigateNextIcon fontSize="small" color='secondary' />}
                >
                  <Link component={RouterLink} className={classes.links} to="/dashboard" style={{display: `${location.pathname === '/' ? 'none' : 'flex' }`}}>
                  Dashboard
                  </Link>
                  {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return(
                      <Link
                        className={classes.links}
                        component={RouterLink}
                        to={to} 
                      >
                        {breadcrumbNameMap[to]}
                      </Link>
                    )
                  })}
                </Breadcrumbs>
              );
            }}
          </Route>
        </div>
      </MemoryRouter>
    </NoSsr>
  );
};

export default withRouter(withStyles(styles)(Navcrumbs));
