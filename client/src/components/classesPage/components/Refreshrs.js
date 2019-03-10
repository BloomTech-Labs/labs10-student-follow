import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Icon
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshrDialog from './RefreshrListDialog';

const styles = theme => ({
  refreshrList: {
    display: 'flex',
    padding: theme.spacing.unit,
    [theme.breakpoints.only('xs')]: {
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  refreshrCard: {
    border: '1px solid white',
    background: theme.palette.secondary.main,
    margin: theme.spacing.unit,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
  },
  refreshrContent: {
    color: theme.palette.primary.dark,
    fontSize: '1.2rem'
  },

  refreshrIcon: {
    alignSelf: 'flex-end',
    margin: '5%',
    color: theme.palette.primary.dark,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  activeRefreshr: {
    height: 200,
    border: '1px solid red',
    margin: theme.spacing.unit * 3,
    position: 'relative'
  },
  newRefCard: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 200
  },
  title: {
    color: `${theme.palette.primary.contrastText}`,
    textAlign: 'center'
  },
  newTitle: {
    color: `${theme.palette.secondary.contrastText}`,
    textAlign: 'center',
    fontSize: '1.6rem'
  },
  icon: {
    alignSelf: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  saveButton: {
    background: theme.palette.secondary.main,
    color: theme.palette.primary.dark,
    padding: '1%',
    display: 'flex',
    flexFlow: 'row nowrap',
    fontSize: '1.2rem',
    width: '50%',
    marginTop: '5%',
    '&:hover': {
      background: theme.palette.secondary.dark
    }
  }
});

function Refreshrs(props) {
  const { classes } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function setDate(e) {
    console.log(e.target.value);
    props.setActiveRefreshr({ ...props.activeRefreshr, date: e.target.value });
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <>
      <Grid>
        <Typography variant="h6" className={classes.title} gutterBottom>
          Refreshrs
        </Typography>
        <Grid className={classes.refreshrList}>
          {props.refreshrs.map((r, i) => (
            <Card className={classes.refreshrCard} key={i} raised>
              <CardContent className={classes.refreshrContent}>
                {r.name}
              </CardContent>
              <CardContent className={classes.refreshrContent}>
                {r.date}
              </CardContent>
              <DeleteIcon
                onClick={() => props.removeRefreshr(r.id)}
                className={classes.refreshrIcon}
              />
            </Card>
          ))}
          {props.activeRefreshr && (
            <Card
              className={classes.activeRefreshr}
              key={props.activeRefreshr.id}
              raised
            >
              <CardContent>{props.activeRefreshr.name}</CardContent>
              <TextField
                onChange={e => setDate(e)}
                variant="outlined"
                type="date"
              />
              {props.activeRefreshr.date && (
                <Button onClick={props.addRefreshr}>Submit</Button>
              )}
            </Card>
          )}
          <RefreshrDialog
            refreshrs={props.teacherRefs}
            open={modalIsOpen}
            handleClose={closeModal}
            selectRefreshr={props.selectRefreshr}
          />
          <Card className={classes.refreshrCard} raised>
            <CardContent className={classes.newRefCard}>
              <Typography variant="h4" className={classes.newTitle}>
                Add a Refreshr
              </Typography>
              <Icon
                className={classes.icon}
                color="action"
                style={{ fontSize: 60 }}
                onClick={() => setModalIsOpen(!modalIsOpen)}
              >
                add_circle
              </Icon>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button variant="outlined" className={classes.saveButton}>
        Save Changes
      </Button>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(Refreshrs);
