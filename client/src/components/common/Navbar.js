import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { breadcrumbNameMap } from '../common/Navcrumbs';

const ListItemLink = props => {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
};

const styles = theme => ({
  wrapper: {
    border: '2px solid black',
    borderRadius: '3px',
    height: '90vh',
    marginLeft: '1rem',
    padding: '0',
    width: '175px'
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

const Navbar = props => {
  const { classes, open, togglePage } = props;

  return (
    <Grid className={classes.wrapper}>
      <div className={classes.lists}>
        <List component="nav">
          <ListItemLink to="/dashboard" open={open} onClick={togglePage} />
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemLink to="/refreshrs" className={classes.nested} />
              <ListItemLink to="/classes" className={classes.nested} />
              <ListItemLink to="/billing" className={classes.nested} />
              <ListItemLink to="/settings" className={classes.nested} />
            </List>
          </Collapse>
        </List>
      </div>
    </Grid>
  );
};

export default withRouter(withStyles(styles)(Navbar));
