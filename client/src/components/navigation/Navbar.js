import React from 'react';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { breadcrumbNameMap } from './Navcrumbs';



const styles = theme => ({
 nav: {
   background: '#7FE5FF',
   margin: 0
 }
});

const Navbar = props => {
  const { classes, to, ...other } = props;
  const primary = breadcrumbNameMap[to];

  return (
    <AppBar position="static">
    
    <Toolbar className={classes.nav}>
   
      <Tabs >
        <Tab to="/dashboard" primary={primary} component={RouterLink} {...other} label='dashboard'/>
        <Tab to="/refreshrs" primary={primary} component={RouterLink} {...other} label='refreshrs'/>
        <Tab to="/classes" primary={primary} component={RouterLink} {...other} label='classes'/>
        <Tab to="/billing" primary={primary} component={RouterLink} {...other} label='billing'/>
      </Tabs>

      <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
    </Toolbar>
    </AppBar>
  );
};

export default withRouter(withStyles(styles)(Navbar));
