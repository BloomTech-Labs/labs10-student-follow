// import React, { Component } from 'react';
// import { ReactTypeformEmbed } from 'react-typeform-embed';
// const axios = require('axios');

// const data = {
//   title: questionObject.refreshrName,
//   variables: {
//     score: 0
//   },
//   fields: [
//     {
//       title: 'Please enter your email address.',
//       type: 'email',
//       validations: {
//         required: true
//       }
//     },
//     {
//       ref: 'question_1',
//       title: questionObject.reviewText,
//       type: 'multiple_choice',
//       properties: {
//         randomize: true,
//         choices: [
//           {
//             ref: 'correct',
//             label: questionObject.answers.a1Text
//           },
//           {
//             ref: 'incorrect_1',
//             label: questionObject.answers.a2Text
//           },
//           {
//             ref: 'incorrect_2',
//             label: questionObject.answers.a3Text
//           },
//           {
//             ref: 'incorrect_3',
//             label: questionObject.answers.a4Text
//           }
//         ]
//       }
//     }
//   ]
//   // logic: [
//   //   {
//   //     type: 'field',
//   //     ref: 'question_1',
//   //     actions: [
//   //       {
//   //         action: 'add',
//   //         details: {
//   //           target: {
//   //             type: 'variable',
//   //             value: 'score'
//   //           },
//   //           value: {
//   //             type: 'constant',
//   //             value: 1
//   //           }
//   //         },
//   //         condition: {
//   //           op: 'is',
//   //           vars: [
//   //             {
//   //               type: 'field',
//   //               value: 'question_1'
//   //             },
//   //             {
//   //               type: 'choice',
//   //               value: 'correct'
//   //             }
//   //           ]
//   //         }
//   //       }
//   //     ]
//   //   }
//   // ]
// };

// const headers = {
//   Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}`
// };

// class Typeform extends Component {
//   constructor() {
//     super();
//     this.state = {
//       forms: []
//     };
//   }

//   getForms = async event => {
//     event.preventDefault();
//     try {
//       const response = await axios.get('https://api.typeform.com/forms', {
//         headers: {
//           Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}`
//         }
//       });
//       console.log('RESPONSE ===', response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   createForm = async event => {
//     try {
//       const response = await axios.post(
//         'https://api.typeform.com/forms',
//         data,
//         {
//           headers
//         }
//       );
//       console.log('RESPONSE ===', response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getAnalytics = async event => {
//     event.preventDefault();
//     try {
//       const response = await axios.get(
//         'https://api.typeform.com/forms/hWWX4R/responses',
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}`
//           }
//         }
//       );
//       console.log('RESPONSE ===', response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   render() {
//     return (
//       <div>
//         <h1>Get the forms!</h1>
//         {/* <ReactTypeformEmbed url="https://nick971045.typeform.com/to/eaHFcw/" /> */}
//         <button onClick={this.getForms}>Get Typeforms</button>
//         <button onClick={this.createForm}>Create Typeforms</button>
//         <button onClick={this.getAnalytics}>Get getAnalytics</button>
//       </div>
//     );
//   }
// }

// // export default Typeform;

// // const Typeform = () => {
// //   return (
// //     <div>
// //       <h1>My Typeform</h1>
// //       {/* <ReactTypeformEmbed url="https://nick971045.typeform.com/to/eaHFcw/" /> */}
// //       <button>Get Typeforms</button>
// //     </div>
// //   );
// // };

// export default Typeform;
