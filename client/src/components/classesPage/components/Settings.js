import React from 'react';
import { Typography, FormGroup, Fab } from '@material-ui/core';
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
      <FormGroup className={classes.nameForm}>
        <Typography variant="body1" gutterBottom>
          Edit Classname
        </Typography>
        {/* <div className={classes.inputBtnDiv}>   */}
        {props.makeInput('className', 'Class Name', props.classData.name, e =>
          props.handleClassChange(e)
        )}
        <Fab
          elevation={20}
          aria-label="Update"
          className={classes.btn}
          onClick={e => props.changeClassName(e)}
        >
          <Update />
        </Fab>
        {/* </div>           */}
      </FormGroup>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(Settings);
