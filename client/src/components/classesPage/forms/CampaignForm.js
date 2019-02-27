import React, { useState, useEffect } from 'react';
import { Grid, TextField, Card, Typography, Icon } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
      const res = await axios.get('https://refreshr.herokuapp.com/refreshrs');
      setRefreshrs(res.data.refreshrs.slice(0, 6));
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
  const setDate = (date, id) => {
    const [refreshr] = refreshrs.filter(r => r.id === id);
    refreshr.date = date;
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
    });
    props.submitClassData();
    alert("You're all done!");
  };

  return (
    <>
      <Grid container className={classes.wrapper}>
        <button onClick={e => handlePrev(e)}>PREV</button>
        <button onClick={e => handleNext(e)}>NEXT</button>
        <Typography variant="h6">Refreshrs(campaign)</Typography>
        <Grid container className={classes.cardList}>
          {refreshrs.map(refreshr => (
            <Card
              className={classes.card}
              key={refreshr.id}
              id={refreshr.id}
              raised
            >
              <Typography variant="subtitle2">{refreshr.name}</Typography>
              <TextField
                variant="outlined"
                type="date"
                defaultValue={today}
                onChange={e => setDate(e.target.value, refreshr.id)}
              />
            </Card>
          ))}
          <Card className={`${classes.card} ${classes.iconCard}`}>
            <Icon color="action" style={{ fontSize: 60 }}>
              add_circle
            </Icon>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styles)(CampaignForm);
