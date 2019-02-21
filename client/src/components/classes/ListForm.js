import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  wrapper: {}
});

function ListForm(props) {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`
    },
    'content-type': 'application/json'
  };
  const listId = 7061139; // test3
  const recipient_id = 'YXN0dXJpYXN4aUBnbWFpbC5jb20='; // Timmy
  const recipient_ids = [
    'YXJlbGkuYXRoZW5zQGNvd3N0b3JlLm5ldA==',
    'YXN0dXJpYXN4aUBnbWFpbC5jb20='
  ]; // Magda, Timmy
  const sender_id = 425702; // The Refreshr Team
  const campaign_id = 5001224; // March Newsletter
  const [list, setList] = useState([]);

  const addList = () => {
    const url = 'https://api.sendgrid.com/v3/contactdb/lists';
    const body = {
      id: 123,
      name: 'Nick test',
      recipient_count: 0
    };
    axios
      .post(url, body, headers)
      .then(res => {
        console.log(`===addList: ${res.data.name}===`);
        console.log(res.data.id);
      })
      .catch(err => console.log(err));
  };

  const getListByID = item => {
    // useEffect(item => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${item.id}`;
    axios
      .get(url, headers)
      .then(res => {
        console.log(`===getList: ${res.data.name}===`);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  // const getLists = () => {
  useEffect(() => {
    console.log('GETTING LIST');
    const url = 'https://api.sendgrid.com/v3/contactdb/lists';
    axios
      .get(url, headers)
      .then(res => {
        console.log(`===getLists: all===`);
        console.log(res.data.lists);
        setList(res.data.lists);
      })
      .catch(err => console.log(err));
  }, []);

  const updateList = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}`;
    const body = {
      name: 'modifiedListName'
    };
    axios
      .patch(url, body, headers)
      .then(res => {
        console.log(`===updateList: ${res.data.name}===`);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const deleteList = item => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${
      item.id
    }?delete_contacts=true`;
    axios
      .delete(url, headers)
      .then(res => {
        console.log(`===deleteList: ${res.statusText}===`);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  console.log('State list', list);
  return (
    <Grid className={props.classes.wrapper}>
      <div>
        <h1>LIST OPERATIONS</h1>
        <button onClick={addList} style={{ background: 'limegreen' }}>
          addList
        </button>
        <button onClick={getListByID} style={{ background: 'goldenrod' }}>
          getList
        </button>
        {/* <button onClick={useEffect} style={{ background: 'goldenrod' }}>
          getLists
        </button> */}
        <button onClick={updateList} style={{ background: 'lightpink' }}>
          updateList
        </button>
        <button onClick={deleteList} style={{ background: 'crimson' }}>
          deleteList
        </button>
        <div>
          {list.map(item => (
            <ul key={item.id}>
              {item.name}
              <button onClick={() => deleteList(item)}>
                {<i className="fas fa-times" />}
              </button>
            </ul>
          ))}
        </div>
      </div>
    </Grid>
  );
}

export default withStyles(styles)(ListForm);
