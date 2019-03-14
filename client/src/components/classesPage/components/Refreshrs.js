import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Fab
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import RefreshrDialog from './RefreshrListDialog';
import {
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
    '&:hover': {
      cursor: 'pointer'
    }
  },
  datePicker: {
    color: theme.palette.primary.contrastText
  },
  title: {
    color: `${theme.palette.primary.contrastText}`,
    textAlign: 'center'
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
                    value={moment(props.activeDate).format('YYYY-MM-DD')}
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
            <Card className={classes.refreshrCard} raised>
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
                <img src={logo} alt="refreshr logo" className={classes.logo} />
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

export default withStyles(styles, { withTheme: true })(Refreshrs);
