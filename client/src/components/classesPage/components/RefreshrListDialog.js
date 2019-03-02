import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'red'
  }
};

const RefreshrDialog = props => {
  console.log('hi');

  const { classes } = props;

  return (
    <Dialog onClose={props.handleClose}>
      <DialogTitle>Select a refreshr</DialogTitle>
      <div>
        <List>
          {props.refreshrs.map(r => (
            <ListItem button onclick={props.refreshrClick} key={r.id}>
              <ListItemText primary={r.name} />
            </ListItem>
          ))}
          <ListItem button onClick={props.addRefreshr}>
            <AddIcon />
          </ListItem>
        </List>
      </div>
    </Dialog>
  );
};

export default RefreshrDialog;
