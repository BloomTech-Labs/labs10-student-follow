import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Card,
  Typography,
  Icon,
  Button
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { addRefreshr, getRefreshr, getRefreshrs, updateRefreshr, deleteRefreshr, scheduleRefreshr, rescheduleRefreshr, getScheduleRefreshr, deleteScheduleRefreshr, sendTestRefreshr, addList } from "../../SendgridOps"

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem'
  },
  cardList: {
    border: '1px solid blue'
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
  }
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

  /* putting the axios request here for now just to design the page. it may make more sense to make
  it in the parent component and then pass down props to the children components */
  const getRefreshrs = async () => {
    try {
      /* this should fetch the class's refreshrs from /refreshrs/classes/:classId,
        but the endpoint is not live yet so I'm using this for testing */
      // const res = await axios.get('https://refreshr.herokuapp.com/refreshrs');
      const res = await axios.get(
        'https://refreshr.herokuapp.com/refreshrs/teachers/308'
      );
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

  // updates the refreshr's date when date input is changed
  const setDate = date => {
    // const [refreshr] = refreshrs.filter(r => r.id === id);
    activeRefreshr.date = Date.parse(date); // not in utc time, bug list
    props.setTimeData(Date.parse(date));
  };

  const handlePrev = e => {
    e.preventDefault();
    props.setStage({
      ...props.stage,
      onSelectionForm: !props.stage.onSelectionForm,
      onCampaignForm: !props.stage.onCampaignForm
    });
  };

  const handleNext = e => {
    e.preventDefault();
    props.setStage({
      ...props.stage,
      onCampaignForm: !props.stage.onCampaignForm,
      onListForm: !props.stage.onListForm
      /* kelfro: I'm pretty sure we should go with the sendgrid update here but I left the part Justin wrote as a comment in case you wanted to keep this.      
   jl_classform_axios
    });
    props.submitClassData(); // submit all form data to back end
    alert("You're all done!");
  };
*/
    });
    alert('Saving to DB and sending to the SendGrid Server!');
  };

  const scheduleRefreshr = () => {
    props.setCampaignData({
      ...props.campaignData,
      title: "Raccoon Jellyfish",
      subject: activeRefreshr.name,
      html_content: "<html><head><title></title></head><body><p>Raccoon Jellyfish! [unsubscribe]</p></body></html>",
      plain_content: "Raccoon Jellyfish! [unsubscribe]"
    });
    setActiveRefreshr(null);
    // console.log(props.campaignData);
  };

  const handleClick = id => {
    const [active] = refreshrs.filter(r => r.id === id);
    setActiveRefreshr(active);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.sendAllToSendgrid();
  };

  return (
    <>
      <Grid container className={classes.wrapper}>
        <button onClick={e => handlePrev(e)}>PREV</button>
        <button onClick={e => handleNext(e)}>NEXT</button>
        <button onClick={e => handleSubmit(e)}>SUBMIT</button>
        <Typography variant="h6">Refreshrs(campaign)</Typography>
        {activeRefreshr ? (
          <Card className={classes.activeCard}>
            <h1>{activeRefreshr.name}</h1>
            <TextField
              variant="outlined"
              type="date"
              defaultValue={today}
              onChange={e => props.setTimeData({
                ...props.timeData,
                send_at: Date.parse(e.target.value)
              })}
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
        <Grid container className={classes.cardList}>
          <Typography variant="h4">Your Refreshrs</Typography>
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
      </Grid>
    </>
  );
}

export default withStyles(styles)(CampaignForm);
