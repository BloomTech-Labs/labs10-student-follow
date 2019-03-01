import React, { Component } from 'react';
const axios = require('axios');
// import { ReactTypeformEmbed } from 'react-typeform-embed';

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
      console.log('THE ERROR', error);
    }
    console.log('WE IN');
  };

  render() {
    return (
      <div>
        <h1>Get the forms!</h1>
        <button onClick={this.getForms}>Get Typeforms</button>
      </div>
    );
  }
}

export default Typeform;

// const Typeform = () => {
//   return (
//     <div>
//       <h1>My Typeform</h1>
//       {/* <ReactTypeformEmbed url="https://nick971045.typeform.com/to/eaHFcw/" /> */}

//       <button>Get Typeforms</button>
//     </div>
//   );
// };

// export default Typeform;
