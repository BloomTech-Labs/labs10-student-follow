import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  Fab
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshrDialog from './RefreshrListDialog';
import {
  Create,
  Backspace,
  RemoveCircleOutline,
  Update,
  AddCircleOutline
} from '@material-ui/icons/';
import moment from 'moment';
import logo from './LogoSmall.png';

const styles = theme => ({
  refreshrCardWrapper: {
    display: 'flex',
    padding: theme.spacing.unit,
    [theme.breakpoints.only('xs')]: {
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    justifyContent: 'center'
  },
  refreshrCard: {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: `${theme.palette.primary.contrastText}`,
    margin: theme.spacing.unit,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    // width: '50%',
    fontSize: '1rem',
    minWidth: 375,
    minHeight: 225,
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
  },
  refreshrContent: {
    // color: theme.palette.primary.dark,
    // color: `${theme.palette.primary.contrastText}`,
    fontSize: '1.0rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  refreshrTitle: {
    color: `${theme.palette.primary.contrastText}`
  },
  refreshrList: {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: `${theme.palette.primary.contrastText}`,
    margin: theme.spacing.unit,
    display: 'flex',
    flexFlow: 'column nowrap',
    borderRadius: '5px',
    backgroundColor: theme.palette.primary.main
  },

  refreshrIcon: {
    alignSelf: 'flex-end',
    margin: '5%',
    // color: theme.palette.primary.dark,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  datePicker: {
    color: theme.palette.primary.contrastText
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
  },
  button: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    width: 40,
    height: 40
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#363c42'
    },
    '&:focus': {
      backgroundColor: '#363c42'
    }
  },
  logo: {
    width: 25,
    height: 25
  },
  subhead: {
    color: theme.palette.primary.contrastText
  },
  listIcon: {
    color: theme.palette.primary.contrastText
  }
});

function Refreshrs(props) {
  const { classes } = props;
  function setDate(e) {
    console.log(e.target.value);
    props.setAddedRefreshr({ ...props.addedRefreshr, date: e.target.value });
  }
  function closeModal() {
    props.setModalIsOpen(false);
  }
  return (
    <>
      <Grid>
        <Typography variant="h6" className={classes.title} gutterBottom>
          Refreshrs
        </Typography>
        <Grid className={classes.refreshrCardWrapper}>
          {props.activeRefreshr ? (
            <Card className={classes.refreshrCard} raised>
              <CardContent className={classes.refreshrContent}>
                <Typography
                  variant="subtitle2"
                  className={classes.refreshrTitle}
                >
                  {props.activeRefreshr.name}
                </Typography>
              </CardContent>
              <CardContent className={classes.refreshrContent}>
                <form
                  styles={{ display: 'flex', flexFlow: 'column' }}
                  onSubmit={e => props.submitNewDate(e)}
                >
                  <TextField
                    variant="outlined"
                    type="date"
                    InputProps={{ className: classes.datePicker }}
                    defaultValue={moment(props.activeRefreshr.date).format(
                      'YYYY-MM-DD'
                    )}
                    onChange={e => props.changeDate(e)}
                  />
                </form>
                <Fab
                  className={classes.button}
                  onClick={props.submitNewDate}
                  elevation={20}
                  aria-label="Update"
                >
                  <Update />
                </Fab>
              </CardContent>
              <RemoveCircleOutline
                onClick={() =>
                  props.removeRefreshr(props.activeRefreshr.refreshr_id)
                }
                className={classes.refreshrIcon}
              />
            </Card>
          ) : props.addedRefreshr ? (
            <Card
              className={classes.refreshrCard}
              // key={props.addedRefreshr.refreshr_id}
              raised
            >
              <CardContent className={classes.refreshrContent}>
                <Typography
                  variant="subtitle2"
                  className={classes.refreshrTitle}
                >
                  {props.addedRefreshr.name}
                </Typography>
              </CardContent>
              <CardContent className={classes.refreshrContent}>
                <TextField
                  onChange={e => setDate(e)}
                  variant="outlined"
                  type="date"
                  InputProps={{ className: classes.datePicker }}
                  defaultValue={moment().format('YYYY-MM-DD')}
                />
              </CardContent>
              {props.addedRefreshr.date && (
                <Button onClick={props.addRefreshr}>Submit</Button>
              )}
            </Card>
          ) : (
            <Card className={classes.refreshrCard} raised>
              <CardContent className={classes.refreshrContent}>
                <Typography
                  variant="subtitle2"
                  className={classes.refreshrTitle}
                >
                  Select a Refreshr To Edit
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        <List
          component="ul"
          className={classes.refreshrList}
          subheader={
            <ListSubheader className={classes.subhead} component="div">
              {props.className} Refreshrs
            </ListSubheader>
          }
        >
          {props.refreshrs.map(r => (
            <ListItem
              className={classes.listItem}
              button
              key={r.refreshr_id}
              onClick={() => props.selectRefreshr(r.refreshr_id)}
            >
              <ListItemIcon>
                <img src={logo} className={classes.logo} />
              </ListItemIcon>

              <ListItemText>{r.name}</ListItemText>
            </ListItem>
          ))}
          <ListItem
            button
            onClick={() => props.setModalIsOpen(!props.modalIsOpen)}
          >
            <ListItemIcon>
              <AddCircleOutline className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText>Add new refreshr to class</ListItemText>
          </ListItem>
        </List>
        <RefreshrDialog
          refreshrs={props.teacherRefs}
          open={props.modalIsOpen}
          handleClose={closeModal}
          selectNewRefreshr={props.selectNewRefreshr}
        />
      </Grid>
    </>
  );
}

/*
                  {props.makeInput(
                    'date',
                    'Date',
                    String(Date(props.activeRefreshr.date)),
                    e => {
                      props.changeDate(e);
                    },
                    'date'
                  )}
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
        <Grid className={classes.refreshrList}>
          {props.addedRefreshr && (
            <Card
              className={classes.refreshrCard}
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


*/

export default withStyles(styles, { withTheme: true })(Refreshrs);
