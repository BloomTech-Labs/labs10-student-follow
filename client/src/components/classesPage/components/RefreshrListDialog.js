import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  Dialog,
  Typography
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  listItem: {
    color: 'blue',
    width: '100vh',
    height: '100vh',
    backgroundColor: 'red'
  },
  link: {
    textDecoration: 'none'
  }
};

const RefreshrDialog = props => {
  const { classes } = props;

  return (
    <div>
      <Dialog onClose={props.handleClose} open={props.open}>
        <DialogTitle>Select a refreshr</DialogTitle>
        <div>
          <List>
            {props.refreshrs.map(r => (
              <ListItem
                button
                onClick={() => props.addRefreshr(r.id)}
                key={r.id}
              >
                <ListItemText primary={r.name} />
              </ListItem>
            ))}
            <Link className={classes.link} to="/questions/create">
              <ListItem>
                <AddIcon />
                <ListItemText primary={'Create a new refreshr'} />
              </ListItem>
            </Link>
          </List>
        </div>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(RefreshrDialog);
