import React from "react";
import {Grid, TextField} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem',
    width: '300px',
    height: '300px',
    border: '1px solid black'
  }
});

  // TEMPORARY
    const new_refresher = {
      "title": "March Newsletter",
      "subject": "New Products for Spring!",
      "sender_id": 424711,
      "list_ids": [
        7061129,
        7061137
      ],
      "segment_ids": null,
      "categories": null,
      "suppression_group_id": null,
      "custom_unsubscribe_url": "",
      "ip_pool": null,
      "html_content": "<html><head><title></title></head><body><p>Check out our spring line!</p></body></html>",
      "plain_content": "Check out our spring line!"
    }

    /*
// JUSTIN
Refreshrs: [
    refreshr_1: {
    id:
    name:
    date:
    review_text: 
    questions: [
      {
        id:
        question:
        wrong_answer:
        right_answer:
      },
      {
        id:
        question:
        wrong_answer:
        right_answer:
      }
    ]
  }
]

Refreshr =
Questions =

Refreshrs= {
  refreshr_1_aka_day2: {
    id: 3431
    name
    date 2/21/2019
    reviewtext

    questions: [
      question_1: {
        id
        question
        wrong,
        right
      },
      question_2: {
        id
        question
        wrong,
        right
      },
      question_3: {
        id
        question
        wrong,
        right
      }
    ]
  },
  refreshr_1_aka_week2: {
    id: 1341
    name
    date
    reviewtext

    questions: [
      question_1: {
        id
        question
        wrong,
        right
      },
      question_2: {
        id
        question
        wrong,
        right
      },
      question_3: {
        id
        question
        wrong,
        right
      }
    ]
  },
}

1. Structure of Refreshr Tree
2. Adding name to each Refreshr
3. Each Refreshr sends out the same exact questions
4. Recipients Operation

*/
function CampaignForm(props) {
  console.log('campaign form props', props);
  
  const addDate = (date, id) => {
    console.log(props.refreshrs[0], typeof id)
    let date2 = new Date(date);
    console.log(date2, typeof date2)
    const refreshr = props.refreshrs.filter(r => r.refreshr_id === id);
    console.log(refreshr);
    refreshr.date = date2;
    if (refreshr.length === 1) {

    }
    console.log(`after: ${refreshr.date}`);
    // console.log(date);


  }

  return (
    <>
    <Grid className={props.classes.wrapper}>
      <p>CampaignForm Component</p>
      {props.refreshrs && props.refreshrs.length && props.refreshrs.map(refreshr => (
        <div className={props.classes.card} key={refreshr.id} id={refreshr.refreshr_id}>
          {refreshr.date}
          <TextField type='date'onChange={(e) => addDate(e.target.value, refreshr.refreshr_id)}/>
        </div>
        ))}
    </Grid>
    </>
  );
};

export default withStyles(styles)(CampaignForm);

/*
{
    "id": 13,
    "name": "compressing",
    "teacher": [
        {
            "teacher_id": 500,
            "name": "Carey Batz",
            "email": "Kaylee24@hotmail.com"
        }
    ],
    "students": [
        {
            "student_id": 17,
            "name": "Otis Doyle",
            "email": "Kiara99@yahoo.com"
        }
    ],
    "refreshrs": [
        {
            "refreshr_id": 63,
            "date": "2019-11-12T00:00:00.000Z",
            "review_text": "Aut nostrum soluta eum non repudiandae cum et maiores corporis maxime animi quis cumque omnis sit alias occaecati et voluptatem.",
            "refreshr": {
                "question_id": 92,
                "question": "Ipsum dolore molestiae cum non nihil temporibus ut aut sed.",
                "wrong_answer_1": "Labore quia earum cumque asperiores.",
                "wrong_answer_2": "Iste tempore explicabo consequatur numquam.",
                "wrong_answer_3": "Deserunt et qui dolores aliquam.",
                "correct_answer": "Officiis et minima qui harum."
            }
        },
        {
            "refreshr_id": 63,
            "date": "2019-11-12T00:00:00.000Z",
            "review_text": "Rerum magni eos dignissimos laborum et ratione id rem quibusdam dolorum et molestias non accusantium provident occaecati nam non cupiditate.",
            "refreshr": {
                "question_id": 31,
                "question": "Quia voluptas soluta quam rerum porro dolor voluptates quos beatae.",
                "wrong_answer_1": "Cumque porro vero accusantium id.",
                "wrong_answer_2": "Consequatur sed corporis necessitatibus maxime.",
                "wrong_answer_3": "Sint quam maxime voluptas ipsum.",
                "correct_answer": "Quia occaecati in vitae vitae."
            }
        }
    ]
}
*/