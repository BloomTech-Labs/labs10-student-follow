import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { breadcrumbNameMap } from '../navigation/Navcrumbs';
import Logo from '../../logo.png';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

/*-------- STYLES --------*/
const styles = theme => ({
  container: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 200,
      flexShrink: 0,
      zIndex: 5
    }
  },
  appBar: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    [theme.breakpoints.up('sm')]: {
      width: '100%'
    }
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  btn: {
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.main,
    fontSize: '1rem',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.contrastText,
      background: theme.palette.primary.dark
    }
  },

  drawerPaper: {
    width: 200
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  list: {
    [theme.breakpoints.up('sm')]: {
      borderLeft: '1px solid #FFFFFF'
    },
    marginTop: 64,
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    height: '100vh',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center'
  },
  navRoutes: {
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    fontSize: '1rem',
    '&:hover': {
      color: theme.palette.secondary.dark
    }
  },
  logo: {
    width: '50px',
    height: '50px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  homeLink: {
    display: 'flex',
    flexFlow: ' column nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dashboardFont: {
    fontSize: '.5rem',
    fontWeight: 'bold',
    color: theme.palette.primary.dark
  }
});

const Navbar = props => {
  const { classes, location, toggleModal } = props;

  /*-------- NAV BUTTONS --------*/
  const ListItemLink = props => {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];

    return (
      <li className={classes.navRoutes}>
        <ListItem button component={RouterLink} to={to} {...other}>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  };

  /*-------- LOGO HOME BUTTON --------*/

  const HomeLink = props => {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];
    return (
      <RouterLink
        to={to}
        className={classes.homeLink}
        style={{ textDecoration: 'none' }}
      >
        <img src={Logo} alt="refreshr logo" {...other} primary={primary} />
        <Typography variant="caption" className={classes.dashboardFont}>
          Home
        </Typography>
      </RouterLink>
    );
  };

  /*-------- NAV DRAWER --------*/
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawer = (
    <List component="nav" className={classes.list}>
      <ListItemLink to="/classes" className={classes.navRoutes} />
      <ListItemLink to="/refreshrs" className={classes.navRoutes} />
      <ListItemLink to="/classes/create" className={classes.navRoutes} />
      <ListItemLink to="/refreshrs/create" className={classes.navRoutes} />
      <ListItemLink to="/billing" className={classes.navRoutes} />
    </List>
  );

  /*-------- LOGIN/LOGOUT BUTTON --------*/

  const handleLogIn = () => {
    if (location.pathname !== '/') {
      localStorage.clear();
      props.lock.logout({
        // PRODUCTION
        returnTo: 'https://refreshr-app.netlify.com',
        // DEVELOPMENT
        //returnTo: 'http://localhost:3000',
        clientID: 'jNDq5B6iAnIRcrpM07Omh05uyppZ89px'
      });
    } else {
      props.lock.show();
    }
  };

  //RENDER REMOVING NAV DRAWER FROM LANDING PAGE

  if (location.pathname !== '/') {
    return (
      <div className={classes.container}>
        <AppBar position="fixed" elevation={20} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Button
              variant="outlined"
              className={classes.btn}
              onClick={e => {
                e.preventDefault();
                handleLogIn();
              }}
            >
              Logout
            </Button>
            <HomeLink className={classes.logo} to="/dashboard" />

            <IconButton
              color="inherit"
              aria-label="Open Nav"
              onClick={toggleDrawer}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Drawer
              variant="temporary"
              anchor="right"
              open={open}
              onClose={toggleDrawer}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              anchor="right"
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Button
              variant="outlined"
              className={classes.btn}
              onClick={e => {
                e.preventDefault();
                handleLogIn();
              }}
            >
              Login/Signup
            </Button>
            <Button
              variant="outlined"
              onClick={e => {
                e.preventDefault();
                toggleModal();
              }}
              className={classes.btn}
            >
              Pricing
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default withRouter(withStyles(styles, { withTheme: true })(Navbar));
