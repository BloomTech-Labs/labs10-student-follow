import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  Dialog
} from '@material-ui/core/';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

const styles = theme => ({
  dialog: {
    border: `1px solid ${theme.palette.secondary.main}`
  },
  listItem: {
    color: theme.palette.secondary.main
  },
  title: {
    color: theme.palette.secondary.main
  },
  link: {
    textDecoration: 'none'
  },
  icon: {
    color: theme.palette.secondary.main
  }
});

const RefreshrDialog = props => {
  const { classes } = props;
  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialog }}
        onClose={props.handleClose}
        open={props.open}
      >
        <DialogTitle>
          <span className={classes.title}>Select a refreshr</span>
        </DialogTitle>
        <div>
          <List>
            {props.refreshrs.map(r => (
              <ListItem
                button
                onClick={() => props.selectNewRefreshr(r.refreshr_id)}
                key={r.refreshr_id}
              >
                <ListItemText
                  classes={{ primary: classes.listItem }}
                  primary={r.name}
                />
              </ListItem>
            ))}
            <Link className={classes.link} to="/refreshrs/create">
              <ListItem>
                <AddCircleOutline className={classes.icon} />
                <ListItemText
                  classes={{ primary: classes.listItem }}
                  primary={'Create a new refreshr'}
                />
              </ListItem>
            </Link>
          </List>
        </div>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(RefreshrDialog);
