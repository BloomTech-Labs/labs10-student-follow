import React from 'react';
import { Typography, Fab } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import Update from '@material-ui/icons/Update';

const styles = theme => ({
  nameForm: {
    // border: `1px solid ${theme.palette.secondary.main}`,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '5%'
  },
  inputBtnDiv: {
    border: '1px solid red',
    display: 'flex',
    flexFlow: 'column nowrap',
    paddingLeft: '10%'
  },
  btn: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    width: 40,
    height: 40
  }
});

function Settings(props) {
  const { classes } = props;
  return (
    <>
      <Typography
        variant="h6"
        color="secondary"
        style={{ textAlign: 'center' }}
      >
        Settings
      </Typography>
      {props.isEditingClass ? (
        <form
          className={classes.nameForm}
          onSubmit={e => props.changeClassName(e)}
        >
          <Typography variant="body1" gutterBottom>
            Edit Classname
          </Typography>
          {props.isEditingClass &&
            props.makeInput(
              'className',
              'Class Name',
              props.classData.name,
              e => {
                props.handleClassChange(e);
              }
            )}
          <Fab
            elevation={20}
            aria-label="Update"
            className={classes.btn}
            onClick={e => props.changeClassName(e)}
          >
            <Update />
          </Fab>
        </form>
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            {props.classData.name}
          </Typography>
          <Create onClick={() => props.setIsEditingClass(true)} />
        </>
      )}
    </>
  );
}

export default withStyles(styles, { withTheme: true })(Settings);
