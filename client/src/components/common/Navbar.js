import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'; import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { breadcrumbNameMap } from '../common/Navcrumbs';
import Logo from '../logo.png'


const ListItemLink = props => {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const HomeLink = props => {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];
  return (
    <RouterLink to={to}><img src={Logo} alt='refreshr logo' {...other} primary={primary} /></RouterLink>

  )
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 200,
      flexShrink: 0,
      zIndex: 50
    },
  },
  appBar: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      zIndex: 200
    },
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },


  drawerPaper: {
    width: 200,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  list: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: '100vh',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center'
  },
  logo: {
    width: '64px',
    height: '64px',
    '&:hover': {
      cursor: 'pointer'
    }
  }
})


const Navbar = props => {
  const { classes, theme } = props;
  console.log('THEME', theme)
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const drawer = (
    <List component="nav" className={classes.list} >
      <ListItemLink to="/dashboard" className={classes.text} />
      <ListItemLink to="/refreshrs" className={classes.text} />
      <ListItemLink to="/classes" className={classes.text} />
      <ListItemLink to="/billing" className={classes.text} />
    </List>
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap>
            Logout
          </Typography>
          <HomeLink className={classes.logo} to='/home' />
          <IconButton color="inherit" aria-label="Open Nav" onClick={toggleDrawer} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Drawer
            variant="temporary"
            anchor='right'
            open={open}
            onClose={toggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            anchor='right'

            classes={{
              paper: classes.drawerPaper,
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
};

export default withRouter(withStyles(styles, { withTheme: true })(Navbar));
