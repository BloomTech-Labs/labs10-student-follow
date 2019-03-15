import React from 'react';
import { Typography, FormGroup, Button, Input } from '@material-ui/core';

const styles = theme => ({
  inputName: {
    marginBottom: theme.spacing.unit,
    padding: '.75%',
    paddingLeft: 14,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: '83%',
    borderRadius: 5
  },
  inputQuestion: {
    marginBottom: theme.spacing.unit,
    padding: '5%',
    paddingLeft: 14,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: '83%',
    borderRadius: 5
  },
  inputMultipleChoice: {
    marginBottom: theme.spacing.unit,
    padding: '.75%',
    paddingLeft: 14,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: '100%',
    borderRadius: 5
  },
  multipleChoice: {
    margin: '3% 1%',
    padding: '2% 10%',
    color: theme.palette.primary.main,
    fontSize: '1em',
    borderRadius: 5,
    width: '100%'
  }
});

const EditQuestions = props => {
  return (
    <div>
      <FormGroup
        onChange={() =>
          setQuestionObject({
            reviewText,
            refreshrName,
            questionTextOne,
            questionTextTwo,
            answers: { a1Text, a2Text, a3Text, a4Text }
          })
        }
      >
        <Typography
          variant="h6"
          color="secondary"
          style={{ textAlign: 'center' }}
        >
          Edit Your Refreshr
        </Typography>

        <hr className={props.classes.hrStyle} />

        <Typography
          variant="body1"
          color="secondary"
          style={{ textAlign: 'center' }}
        >
          Refreshr Name
        </Typography>

        <FormGroup
          className={props.classes.form1}
          onSubmit={props.handleSubmit}
        >
          <Typography
            className={
              refreshrNameEdit ? props.classes.hidden : props.classes.editText
            }
          >
            {refreshrName}
          </Typography>
          <Input
            disableUnderline
            onChange={e => setRefreshrName(e.target.value)}
            name="classnameInput"
            required
            type="text"
            value={refreshrName}
            className={
              refreshrNameEdit ? props.classes.inputName : props.classes.hidden
            }
          />
          <FormGroup
            onClick={() => setRefreshrNameEdit(!refreshrNameEdit)}
            className={props.classes.edit}
          >
            <i className="fas fa-pen" />
            <h4 className={props.classes.editIcon}>Edit</h4>
          </FormGroup>
        </FormGroup>

        <hr className={props.classes.hrStyle} />

        <h4 className={props.classes.subheaders}>Your Review Text</h4>

        <FormGroup
          className={props.classes.form1}
          onSubmit={props.handleSubmit}
        >
          <Typography
            className={
              reviewEdit ? props.classes.hidden : props.classes.editText
            }
          >
            {reviewText}
          </Typography>
          <Input
            disableUnderline
            onChange={e => setReviewText(e.target.value)}
            name="classnameInput"
            required
            multiline
            rows="4"
            value={reviewText}
            className={
              reviewEdit ? props.classes.inputQuestion : props.classes.hidden
            }
          />
          <FormGroup
            onClick={() => setReviewEdit(!reviewEdit)}
            className={props.classes.edit}
          >
            <i className="fas fa-pen" />
            <h4 className={props.classes.editIcon}>Edit</h4>
          </FormGroup>
        </FormGroup>

        <hr className={props.classes.hrStyle} />

        <h4 className={props.classes.subheaders}>Your Questions</h4>

        <Typography
          variant="body1"
          color="secondary"
          style={{ textAlign: 'center' }}
        >
          Question 1: Multiple Choice Response
        </Typography>
        <FormGroup
          className={props.classes.form1}
          onSubmit={props.handleSubmit}
        >
          <Typography
            className={
              multiChoiceEdit ? props.classes.hidden : props.classes.editText
            }
          >
            {questionTextOne.text}
          </Typography>
          <Input
            disableUnderline
            onChange={e =>
              setQuestionTextOne({ ...questionTextOne, text: e.target.value })
            }
            name="classnameInput"
            required
            multiline
            rows="4"
            value={questionTextOne.text}
            className={
              multiChoiceEdit
                ? props.classes.inputQuestion
                : props.classes.hidden
            }
          />
        </FormGroup>

        <FormGroup>
          <Typography
            style={{
              textAlign: 'center',
              width: '100%'
            }}
            className={
              multiChoiceEdit ? props.classes.hidden : props.classes.editText
            }
          >
            {a1Text}
          </Typography>
          <Typography
            style={{
              textAlign: 'center',
              width: '100%'
            }}
            className={
              multiChoiceEdit ? props.classes.hidden : props.classes.editText
            }
          >
            {a2Text}
          </Typography>
          <Typography
            style={{
              textAlign: 'center',
              width: '100%'
            }}
            className={
              multiChoiceEdit ? props.classes.hidden : props.classes.editText
            }
          >
            {a3Text}
          </Typography>
          <Typography
            style={{
              textAlign: 'center',
              width: '100%'
            }}
            className={
              multiChoiceEdit ? props.classes.hidden : props.classes.editText
            }
          >
            {a4Text}
          </Typography>
          <form className={props.classes.multipleChoice}>
            <Input
              disableUnderline
              onChange={e => setA1Text(e.target.value)}
              name="classnameInput"
              required
              value={a1Text}
              className={
                multiChoiceEdit
                  ? props.classes.inputMultipleChoice
                  : props.classes.hidden
              }
            />
            <Input
              disableUnderline
              name="classnameInput"
              onChange={e => setA2Text(e.target.value)}
              required
              value={a2Text}
              className={
                multiChoiceEdit
                  ? props.classes.inputMultipleChoice
                  : props.classes.hidden
              }
            />
            <Input
              disableUnderline
              onChange={e => setA3Text(e.target.value)}
              name="classnameInput"
              required
              value={a3Text}
              className={
                multiChoiceEdit
                  ? props.classes.inputMultipleChoice
                  : props.classes.hidden
              }
            />
            <Input
              disableUnderline
              onChange={e => setA4Text(e.target.value)}
              name="classnameInput"
              required
              value={a4Text}
              className={
                multiChoiceEdit
                  ? props.classes.inputMultipleChoice
                  : props.classes.hidden
              }
            />
          </form>
        </FormGroup>
        <FormGroup
          onClick={() => setMultiChoiceEdit(!multiChoiceEdit)}
          className={props.classes.edit}
        >
          <i className="fas fa-pen" />
          <h4 className={props.classes.editIcon}>Edit</h4>
        </FormGroup>

        <hr className={props.classes.hrStyle} />

        <Typography
          variant="body1"
          color="secondary"
          style={{ textAlign: 'center' }}
        >
          Question 2: Text Response
        </Typography>

        <FormGroup
          className={props.classes.form1}
          onSubmit={props.handleSubmit}
        >
          <Typography
            className={q2Edit ? props.classes.hidden : props.classes.editText}
          >
            {questionTextTwo.text}
          </Typography>
          <Input
            disableUnderline
            name="classnameInput"
            onChange={e =>
              setQuestionTextTwo({ ...questionTextTwo, text: e.target.value })
            }
            required
            multiline
            rows="4"
            value={questionTextTwo.text}
            className={
              q2Edit ? props.classes.inputQuestion : props.classes.hidden
            }
          />
          <FormGroup
            onClick={() => setQ2Edit(!q2Edit)}
            className={props.classes.edit}
          >
            <i className="fas fa-pen" />
            <h4 className={props.classes.editIcon}>Edit</h4>
          </FormGroup>
        </FormGroup>

        <hr className={props.classes.hrStyle} />
        <Button
          variant="contained"
          color="primary"
          onClick={e => {
            props.editForm(e);
            handleUpdateSnackBool();
          }}
        >
          Update
        </Button>
      </FormGroup>
    </div>
  );
};

export default EditQuestions;
