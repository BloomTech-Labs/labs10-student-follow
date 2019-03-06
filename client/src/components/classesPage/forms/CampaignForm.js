import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Card,
  Typography,
  Icon,
  Button,
  Fab
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Send from '@material-ui/icons/Send';
import moment from 'moment'

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
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.only('md')]: {
      width: '60%'
    },
    width: '50%'
  },
  cardList: {
    display: 'flex',
    justifyContent: 'center',
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
    margin: 20,
    width: 300,
    height: 300,
    padding: theme.spacing.unit * 3,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid red'
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
      flexDirection: 'column',
    }
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing.unit * 2,
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
    height: 40,
  },
  rightBtn: {
    marginLeft: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    width: 40,
    height: 40,
  },
});

function CampaignForm(props) {
  const [refreshrs, setRefreshrs] = useState([]);
  const [activeRefreshr, setActiveRefreshr] = useState(null);

  const { classes } = props;
  let today = new Date(); // to set default for date inputs
  today = dateMapper(today);

  // fetch class refreshrs on mount
  useEffect(() => {
    getRefreshrs();
  }, []);

  const token = localStorage.getItem('accessToken');

  const ax = axios.create({
    baseURL: 'http://localhost:9000',
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  /* putting the axios request here for now just to design the page. it may make more sense to make
  it in the parent component and then pass down props to the children components */
  const getRefreshrs = async () => {
    try {
      /* this should fetch the class's refreshrs from /refreshrs/classes/:classId,
        but the endpoint is not live yet so I'm using this for testing */
      // const res = await axios.get('https://refreshr.herokuapp.com/refreshrs');
      const res = await ax.get(
        // '/refreshrs/teachers/53'
        'https://refreshr.herokuapp.com/refreshrs/teachers/394'
      );
      // console.log(res.data);
      setRefreshrs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // got to be a cleaner way to do this, but it works for now
  function dateMapper(date) {
    const month =
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const handlePrev = e => {
    e.preventDefault();
    props.setStage({
      ...props.stage,
      onListForm: !props.stage.onListForm,
      onCampaignForm: !props.stage.onCampaignForm
    });
  };

  const scheduleRefreshr = () => {
    props.setCampaignData({
      ...props.campaignData,
      title: 'Your Refreshr Is Here!',
      subject: activeRefreshr.name,
      html_content:
        `<html><head><title></title></head><body><p>${activeRefreshr.review_text} [unsubscribe]</p></body></html>`,
      plain_content: `${activeRefreshr.review_text} [unsubscribe]`,
      refreshr_id: activeRefreshr.refreshr_id,
    });
    setActiveRefreshr(null);
  };

  const handleClick = id => {
    const [active] = refreshrs.filter(r => r.id === id);
    setActiveRefreshr(active);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.sendAllToSendgrid();
  };

  const alterTime = (e) => {
    e.preventDefault()
    const a = moment(`${e.target.value}T00:00:00`)
    const b = moment(`${e.target.value}T00:00:00`).unix()
    const twoD = moment(`${e.target.value}T00:00:00`).add(2, 'day').toString()
    const twoDU = moment(`${e.target.value}T00:00:00`).add(2, 'day').unix()
    const twoW = moment(`${e.target.value}T00:00:00`).add(2, 'weeks').toString()
    const twoWU = moment(`${e.target.value}T00:00:00`).add(2, 'weeks').unix()
    const twoM = moment(`${e.target.value}T00:00:00`).add(2, 'month').toString()
    const twoMU = moment(`${e.target.value}T00:00:00`).add(2, 'month').unix()

    console.log(a)
    console.log(b)
    console.log(`2 days`)
    console.log(twoD, twoDU)
    console.log(`2 weeks`)
    console.log(twoW, twoWU)
    console.log(`2 months`)
    console.log(twoM, twoMU)

    const timeTriData = [
      {
        send_at: twoDU,
      },
      {
        send_at: twoWU,
      },
      {
        send_at: twoMU,
      },
    ]

    props.setTimeTriData([
      ...timeTriData
    ])

    // let day2 = moment(`${e.target.value} 8:00`)
    // console.log(day2.add(14, 'days'))

    // tacking time onto campaign data for submitClassData()
    // props.setCampaignData({
    //   ...props.campaignData,
    //   date: e.target.value
    // });

    // const inputTime = Date.parse(e.target.value) / 1000
    // const alteredTime = inputTime + 18000 // Adds 5 hours on, makes it same day @ 12am from user input
    // console.log(alteredTime)
    // const alteredTime2d = inputTime + 18000 // Adds 5 hours on, makes it same day @ 12am from user input
    // const alteredTime2wk = inputTime + 18000 // Adds 5 hours on, makes it same day @ 12am from user input
    // const alteredTime2mo = inputTime + 18000 // Adds 5 hours on, makes it same day @ 12am from user input

    // console.log(alteredTime2d)
    // console.log(alteredTime2wk)
    // console.log(alteredTime2mo)
    // props.setTimeData({
    //   ...props.timeData,
    //   send_at: alteredTime
    // })
  }

  return (
    <Grid container className={classes.container}>
      <Typography variant="h6" color="secondary" style={{ textAlign: 'center' }}>
        Schedule Class
      </Typography>

      <hr className={classes.hrStyle} />

      {activeRefreshr ? (
        <Card className={classes.activeCard}>
          <h1>{activeRefreshr.name}</h1>
          <TextField
            variant="outlined"
            type="date"
            defaultValue={today}
            onChange={e => alterTime(e)}
          />
          <Button
            variant="outlined"
            color="inherit"
            onClick={scheduleRefreshr}
          >
            Schedule this refreshr!
          </Button>
        </Card>
      ) : (
          <Card className={classes.card}>
            <h4>select a refreshr to schedule</h4>
          </Card>
        )}

      <hr className={classes.hrStyle} />

      <Typography variant="p" color="secondary" style={{ textAlign: 'center' }}>
        Your Refreshrs
      </Typography>

      <Grid className={classes.cardList}>
        {refreshrs.map(refreshr => (
          <Card
            onClick={() => handleClick(refreshr.id)}
            className={classes.card}
            key={refreshr.id}
            id={refreshr.id}
            raised
          >
            <Typography variant="subtitle2">{refreshr.name}</Typography>
          </Card>
        ))}
        <Link to="/questions/create">
          <Card className={`${classes.card} ${classes.iconCard}`}>
            <Icon color="action" style={{ fontSize: 60 }}>
              add_circle
            </Icon>
          </Card>
        </Link>
      </Grid>

      <hr className={classes.hrStyle} />

      <div className={classes.navDiv}>
        <div className={classes.buttonDiv}>
          <Fab
            elevation={20}
            aria-label="Back"
            className={classes.leftBtn}
          >
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
          <Fab
            elevation={20}
            aria-label="Submit"
            className={classes.rightBtn}
          >
            <Send onClick={e => handleSubmit(e)} />
          </Fab>
        </div>
      </div>
    </Grid>
  );
}

export default withStyles(styles)(CampaignForm);
