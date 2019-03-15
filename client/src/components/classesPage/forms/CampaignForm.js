import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  TextField,
  Card,
  Typography,
  Button,
  Fab,
  IconButton,
  Snackbar,
  withStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core/';
import { ArrowBack, Close, Send } from '@material-ui/icons';
import logo from '../components/LogoSmall.png';
import axios from 'axios';
import moment from 'moment';
import makeEmail from '../components/Email';

const styles = theme => ({
  container: {
    border: `1px solid ${theme.palette.secondary.main}`,
    ...theme.mixins.gutters(),
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 8,
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 4,
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark,
    [theme.breakpoints.only('sm')]: {
      width: '60vw'
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw'
    },
    width: 600
  },
  cardList: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    margin: 20,
    width: 200,
    height: 200,
    padding: theme.spacing.unit * 3,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column'
  },
  activeCard: {
    margin: 10,
    width: '90%',
    minHeight: 300,
    padding: theme.spacing.unit * 3,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.secondary.main}`
  },
  dateField: {
    marginTop: 20
  },
  iconCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none'
  },
  navDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing.unit * 2
    }
  },
  hrStyle: {
    margin: '1rem auto',
    width: '100%'
  },
  leftBtn: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    width: 40,
    height: 40
  },
  rightBtn: {
    marginLeft: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    width: 40,
    height: 40
  },
  scheduleDiv: {
    margin: '1rem 0',
    fontSize: '1.1rem'
  },
  refreshrTitle: {
    color: theme.palette.secondary.main
  },
  dateInput: {
    color: theme.palette.secondary.main
  },
  scheduleText: {
    marginTop: 10,
    marginLeft: '1rem',
    fontSize: '1.1rem'
  },
  listContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  refreshrList: {
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.primary.main,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    minWidth: 240
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#363c42'
    },
    '&:focus': {
      backgroundColor: '#363c42'
    }
  },
  listItemText: {
    fontSize: '1rem'
  },
  subhead: {
    color: theme.palette.secondary.main
  },
  logo: {
    width: 25,
    height: 25
  },
  dualButtonDiv: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around'
  },
  dualButton: {
    width: '49%',
    margin: 2.5,
    fontSize: '1.2rem'
  }
});

function CampaignForm(props) {
  // DESTRUCTURES
  const { classes } = props;

  // HOOKS
  const [refreshrs, setRefreshrs] = useState([]);
  const [activeRefreshr, setActiveRefreshr] = useState(null);
  const [scheduledRefreshrs, setScheduledRefreshrs] = useState([]);

  // For displaying on the page for the ease of user
  // current time, 2 days, 2 weeks, 2 months
  let [schedule, setSchedule] = useState({
    schedule0: null,
    schedule1: null,
    schedule2: null,
    schedule3: null
  });

  // FORM NAVIGATION
  const handlePrev = e => {
    e.preventDefault();
    props.setStage({
      ...props.stage,
      onListForm: !props.stage.onListForm,
      onCampaignForm: !props.stage.onCampaignForm
    });
  };

  // DATE OPERATIONS
  let today = new Date(); // to set default for date inputs
  today = dateMapper(today);

  // GET REFRESHRS OPERATIONS
  // fetch class refreshrs on mount
  useEffect(() => {
    getRefreshrs();
  }, []);

  const token = localStorage.getItem('accessToken');

  const ax = axios.create({
    //PRODUCTION
    //baseURL: 'https://refreshr.herokuapp.com',
    //DEVELOPMENT
    baseURL: 'http://localhost:9000',
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const getRefreshrs = async () => {
    try {
      const uid = localStorage.getItem('user_id');
      const res = await ax.get(
        `/teachers/${uid}/refreshrs`
        // 'https://refreshr.herokuapp.com/teachers/${userID}/refeshrs'
      );
      setRefreshrs(res.data.refreshrs);
    } catch (err) {
      console.log(err);
    }
  };

  function dateMapper(date) {
    const month =
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // SCHEDULE REFRESHR OPERATIONS
  const scheduleRefreshr = async () => {
    props.setCampaignData({
      ...props.campaignData,
      title: 'Your Refreshr Is Here!',
      subject: activeRefreshr.name,
      html_content: `<html><head><title></title></head><body><p>
      Take your Refreshr <a href=${activeRefreshr.typeform_url}>here</a>.</p>
      <p></p>
      <a href=
      [unsubscribe]>
      Unsubscribe</a>
      </body></html>`,
      plain_content: `Take your Refreshr ${
        activeRefreshr.typeform_url
      } [unsubscribe]
      `,
      refreshr_id: activeRefreshr.refreshr_id
    });

    setScheduledRefreshrs([...scheduledRefreshrs, activeRefreshr]);
    setRefreshrs(
      refreshrs.filter(r => r.refreshr_id !== activeRefreshr.refreshr_id)
    );
    setActiveRefreshr(null);
  };

  const sendTestRefreshr = async () => {
    try {
      // props.setCampaignData({
      // ...props.campaignData,
      const testRefreshr = {
        title: 'Your Refreshr Is Here!',
        subject: activeRefreshr.name,
        sender_id: 428251, // permanent (Refreshr Team)
        suppression_group_id: 9332, // permanent (Unsubscribe ID)
        html_content: makeEmail(activeRefreshr),
        // html_content: `<html><head><title></title></head><body><p>
        // Take your Refreshr <a href=${activeRefreshr.typeform_url}>here</a>.</p>
        // <p></p>
        // <a href=
        // [unsubscribe]>
        // Unsubscribe</a>
        // </body></html>`,
        plain_content: `Take your Refreshr ${
          activeRefreshr.typeform_url
        } [unsubscribe]
      `
        // refreshr_id: activeRefreshr.refreshr_id
      };
      // });
      // const testRefreshr = makeEmail(activeRefreshr);
      setScheduledRefreshrs([...scheduledRefreshrs, activeRefreshr]);
      setRefreshrs(
        refreshrs.filter(r => r.refreshr_id !== activeRefreshr.refreshr_id)
      );
      props.sendTest(testRefreshr);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = id => {
    const [active] = refreshrs.filter(r => r.refreshr_id === id);
    setActiveRefreshr(active);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.sendAllToSendgrid(scheduledRefreshrs);
    handleScheduleRefreshSnack();
  };

  // DATE AND TIME OPERATIONS
  const alterTime = e => {
    e.preventDefault();
    const date = e.target.value;

    // const date = e.target.value;

    const schedule0 = moment(date).format('ddd, MMMM Do, YYYY ha');
    const schedule1 = moment(date)
      .add(2, 'day')
      .format('ddd, MMMM Do, YYYY ha');
    const schedule2 = moment(date)
      .add(2, 'weeks')
      .format('ddd, MMMM Do, YYYY ha');
    const schedule3 = moment(date)
      .add(2, 'month')
      .format('ddd, MMMM Do, YYYY ha');

    const twoDaysUnix = moment(date)
      .add(2, 'day')
      .unix();
    const twoWeeksUnix = moment(date)
      .add(2, 'weeks')
      .unix();
    const twoMonthsUnix = moment(date)
      .add(2, 'month')
      .unix();

    const timeTriData = [
      { send_at: twoDaysUnix },
      { send_at: twoWeeksUnix },
      { send_at: twoMonthsUnix }
    ];

    setActiveRefreshr({ ...activeRefreshr, timeTriData, date });

    setSchedule({
      ...schedule,
      schedule0,
      schedule1,
      schedule2,
      schedule3
    });

    props.setTimeTriData([...timeTriData]);
  };

  const [scheduleRefreshSnack, setScheduleRefreshSnack] = useState(false);
  const handleScheduleRefreshSnack = (event, reason) => {
    if (reason === 'clickaway') {
      // clickaway is if they fire the snackbar before it's gone
      return;
    }
    setScheduleRefreshSnack(!scheduleRefreshSnack);
  };

  return (
    <Paper className={classes.container} elevation={24}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={scheduleRefreshSnack}
        autoHideDuration={4000}
        onClose={handleScheduleRefreshSnack}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={
          <span id="message-id">
            {refreshrs.length > 1
              ? 'Refreshrs Scheduled!'
              : 'Refreshr Scheduled!'}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleScheduleRefreshSnack}
          >
            <Close />
          </IconButton>
        ]}
      />
      <Typography
        variant="h6"
        color="secondary"
        style={{ textAlign: 'center' }}
      >
        Schedule Class
      </Typography>

      <hr className={classes.hrStyle} />

      {activeRefreshr ? (
        <Card className={classes.activeCard}>
          <Typography variant="h6" className={classes.refreshrTitle}>
            {activeRefreshr.name}
          </Typography>
          <TextField
            InputProps={{ className: classes.dateInput }}
            variant="outlined"
            type="date"
            defaultValue={today}
            onChange={e => {
              alterTime(e);
            }}
          />
          {schedule.schedule0 && (
            <div className={classes.scheduleDiv}>
              <Typography
                className={classes.scheduleText}
                variant="subtitle2"
                color="secondary"
              >
                Input: {schedule.schedule0 || ''}
              </Typography>
              <Typography
                className={classes.scheduleText}
                variant={'body2'}
                color="secondary"
              >
                +2 days: {schedule.schedule1 || ''}
              </Typography>
              <Typography
                className={classes.scheduleText}
                variant={'body2'}
                color="secondary"
              >
                +2 weeks: {schedule.schedule2 || ''}
              </Typography>
              <Typography
                className={classes.scheduleText}
                variant={'body2'}
                color="secondary"
              >
                +2 months: {schedule.schedule3 || ''}
              </Typography>
            </div>
          )}
          <div className={classes.dualButtonDiv}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={scheduleRefreshr}
              className={classes.dualButton}
            >
              Load Schedule
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={sendTestRefreshr}
              className={classes.dualButton}
            >
              Send Test
            </Button>
          </div>
        </Card>
      ) : (
        <Card className={classes.activeCard}>
          <Typography variant="body1">
            Select a refreshr below to schedule
          </Typography>
        </Card>
      )}

      <hr className={classes.hrStyle} />

      <Typography
        variant="body2"
        color="secondary"
        style={{ textAlign: 'center' }}
      >
        Your Refreshrs
      </Typography>

      <Grid className={classes.listContainer}>
        <List
          className={classes.refreshrList}
          subheader={
            <ListSubheader className={classes.subhead} component="div">
              Your Refreshrs
            </ListSubheader>
          }
        >
          {refreshrs.map(r => (
            <ListItem
              className={classes.listItem}
              button
              key={r.refreshr_id}
              onClick={() => handleClick(r.refreshr_id)}
            >
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary={r.name}
              />
            </ListItem>
          ))}
        </List>
        <List
          className={classes.refreshrList}
          subheader={
            <ListSubheader className={classes.subhead} component="div">
              Scheduled Refreshrs
            </ListSubheader>
          }
        >
          {scheduledRefreshrs.map(r => (
            <ListItem
              className={classes.listItem}
              button
              key={r.refreshr_id}
              onClick={() => handleClick(r.refreshr_id)}
            >
              <ListItemIcon>
                <img src={logo} alt="Refreshr icon" className={classes.logo} />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary={r.name}
              />
            </ListItem>
          ))}
        </List>
      </Grid>

      <hr className={classes.hrStyle} />

      <div className={classes.navDiv}>
        <div className={classes.buttonDiv}>
          <Fab elevation={20} aria-label="Back" className={classes.leftBtn}>
            <ArrowBack onClick={e => handlePrev(e)} />
          </Fab>
          <Typography
            variant="body2"
            color="secondary"
            className={classes.nextText}
          >
            PREV
          </Typography>
        </div>
        <div className={classes.buttonDiv}>
          <Typography
            variant="body2"
            color="secondary"
            className={classes.nextText}
          >
            SEND
          </Typography>
          <Fab elevation={20} aria-label="Submit" className={classes.rightBtn}>
            <Send onClick={e => handleSubmit(e)} />
          </Fab>
        </div>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(CampaignForm);
