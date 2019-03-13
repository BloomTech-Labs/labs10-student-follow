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
import { Create, Backspace } from '@material-ui/icons/';
import moment from 'moment';

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
    width: '50%',
    fontSize: '1rem',
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
  },
  refreshrContent: {
    color: theme.palette.primary.dark,
    fontSize: '1.0rem'
  },

  refreshrIcon: {
    alignSelf: 'flex-end',
    margin: '5%',
    color: theme.palette.primary.dark,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  addedRefreshr: {
    height: 200,
    border: `4px solid theme.palette.secondary`,
    margin: theme.spacing.unit * 3,
    position: 'relative'
  },
  activeRefreshr: {
    transform: 'scale(1.2)',
    border: `4px solid blue`,
    background: theme.palette.secondary.main,
    margin: theme.spacing.unit,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    width: '50%',
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
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
    props.setAddedRefreshr({ ...props.addedRefreshr, date: e.target.value });
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
          {props.refreshrs.map(r => (
            <Card
              className={
                r === props.activeRefreshr
                  ? classes.activeRefreshr
                  : classes.refreshrCard
              }
              key={r.refreshr_id}
              onClick={() => props.selectRefreshr(r.refreshr_id)}
              raised
            >
              <CardContent className={classes.refreshrContent}>
                <Typography variant="subtitle2">{r.name}</Typography>
              </CardContent>
              <CardContent className={classes.refreshrContent}>
                {r === props.activeRefreshr ? (
                  <form onSubmit={e => props.submitNewDate(e)}>
                    {props.makeInput(
                      'date',
                      'Date',
                      // Date(r.date),
                      undefined,
                      e => {
                        props.changeDate(e);
                      },
                      'date'
                    )}
                    <button>submit</button>
                  </form>
                ) : (
                  <>
                    <Typography variant="body1">Taught On:</Typography>
                    <Typography variant="body1">
                      {moment(r.date).format('MM/DD/YY')}
                    </Typography>
                  </>
                )}
              </CardContent>
              <DeleteIcon
                onClick={() => props.removeRefreshr(r.refreshr_id)}
                className={classes.refreshrIcon}
              />
            </Card>
          ))}
          {props.addedRefreshr && (
            <Card
              className={classes.addedRefreshr}
              key={props.addedRefreshr.refreshr_id}
              raised
            >
              <CardContent>{props.addedRefreshr.name}</CardContent>
              <TextField
                onChange={e => setDate(e)}
                variant="outlined"
                type="date"
              />
              {props.addedRefreshr.date && (
                <Button onClick={props.addRefreshr}>Submit</Button>
              )}
            </Card>
          )}
          <RefreshrDialog
            refreshrs={props.teacherRefs}
            open={modalIsOpen}
            handleClose={closeModal}
            selectNewRefreshr={props.selectNewRefreshr}
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
