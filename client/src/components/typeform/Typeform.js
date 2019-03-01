import React, { Component } from 'react';
const axios = require('axios');
// import { ReactTypeformEmbed } from 'react-typeform-embed';

const data = {
  title: 'Test from codebase',
  fields: [
    {
      title: 'the test',
      type: 'multiple_choice',
      properties: {
        description: 'Brilliant questions!',
        choices: [
          {
            ref: 'Coding coding coding',
            label: 'correct answer'
          }
        ]
      }
    }
  ]
};

const headers = {
  Authorization: 'Bearer A7N7Mxo3cHvRyh7heJ4BErAzHYj4VTTsYT98MD77haXs'
};

class Typeform extends Component {
  constructor() {
    super();
    this.state = {
      forms: []
    };
  }

  getForms = async event => {
    event.preventDefault();
    try {
      const response = await axios.get('https://api.typeform.com/forms', {
        headers: {
          Authorization: 'Bearer A7N7Mxo3cHvRyh7heJ4BErAzHYj4VTTsYT98MD77haXs'
        }
      });
      console.log('RESPONSE ===', response);
    } catch (error) {
      console.log(error);
    }
  };

  createForm = async event => {
    try {
      const response = await axios('https://api.typeform.com/forms', {
        headers,
        data
      });
      console.log('RESPONSE ===', response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Get the forms!</h1>
        <button onClick={this.getForms}>Get Typeforms</button>
        <button onClick={this.createForm}>Create Typeforms</button>
      </div>
    );
  }
}

// export default Typeform;

// const Typeform = () => {
//   return (
//     <div>
//       <h1>My Typeform</h1>
//       {/* <ReactTypeformEmbed url="https://nick971045.typeform.com/to/eaHFcw/" /> */}

//       <button>Get Typeforms</button>
//     </div>
//   );
// };

export default Typeform;
