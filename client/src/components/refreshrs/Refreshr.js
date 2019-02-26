import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  wrapper: {
    border: '2px solid black',
    borderRadius: '3px',
    height: '90vh',
    marginLeft: '3rem',
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1rem',
  },
  studentName: {
    maxWidth: '250px',
    width: '100%',
    height: '100%',
    maxHeight: '35px',
  },
});

function PracticeRefreshrQuiz(props) {
  const [ studentName, addStudentName ] = useState("");
  const [ reviewText, setReviewText ] = useState("This is a short section of text that describes or reminds about one part of the topic. It is not intended to be a complete review of the material, just a reminder of the most important parts. This section is limited to 512 characters.");
  const [ questionText, setQuestionText ] = useState("This is a multiple choice question related to the topic. Again the goal is not to be exhaustive, just to call the material to mind. A good question will not simply call for the recollection of information, but will require the application of knowledge.");
  
  return (
    <Grid className={props.classes.wrapper}>
        <TextField
          value={studentName}
          label="Student Name"
          name="studentName"
          className={props.classes.studentName}
          placeholder="Your name goes here..."
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => addStudentName(e.target.value)}
        />
        <h4>Two Days - Review Text</h4>
        <TextField
          value={reviewText}
          id="outlined"
          label="Review Text"
          name="reviewText"
          multiline
          readonly
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <h4>Two Days - Question</h4>
        <TextField
          value={questionText}
          id="outlined"
          label="Question"
          name="question"
          multiline
          readonly
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
    </Grid>
  );
};

export default withStyles(styles)(PracticeRefreshrQuiz);
