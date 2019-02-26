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
  '/dashboard': 'Dashboard',
  '/refreshrs': 'Refreshrs',
  '/classes': 'Classes',
  '/billing': 'Billing',
  '/settings': 'Settings'
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
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
                  separator={<NavigateNextIcon fontSize="small" />}
                >
                  <Link component={RouterLink} color="inherit" to="/home">
                    Home
                  </Link>
                  {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return last ? (
                      <Typography color="textPrimary" key={to}>
                        {breadcrumbNameMap[to]}
                      </Typography>
                    ) : (
                        <Link
                          component={RouterLink}
                          color="inherit"
                          to={to}
                          key={to}
                        >
                          {breadcrumbNameMap[to]}
                        </Link>
                      );
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
