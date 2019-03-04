import React, { Component } from 'react';
import { ReactTypeformEmbed } from 'react-typeform-embed';
const axios = require('axios');

const data = {
  title: 'Testing from Typeform section of codebase',
  fields: [
    {
      title: 'Please enter your email address.',
      type: 'email',
      validations: {
        required: 'true'
      }
    },
    {
      title: 'A great test',
      type: 'multiple_choice',
      properties: {
        description: 'Fantastic questions!',
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
  Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}`
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
          Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}`
        }
      });
      console.log('RESPONSE ===', response);
    } catch (error) {
      console.log(error);
    }
  };

  createForm = async event => {
    try {
      const response = await axios.post(
        'https://api.typeform.com/forms',
        data,
        {
          headers
        }
      );
      console.log('RESPONSE ===', response);
    } catch (error) {
      console.log(error);
    }
  };

  getAnalytics = async event => {
    event.preventDefault();
    try {
      const response = await axios.get(
        'https://api.typeform.com/forms/hWWX4R/responses',
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}`
          }
        }
      );
      console.log('RESPONSE ===', response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Get the forms!</h1>
        {/* <ReactTypeformEmbed url="https://nick971045.typeform.com/to/eaHFcw/" /> */}
        <button onClick={this.getForms}>Get Typeforms</button>
        <button onClick={this.createForm}>Create Typeforms</button>
        <button onClick={this.getAnalytics}>Get getAnalytics</button>
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
