import React from 'react';
// import BigPapa from 'papaparse';
// import { addList, getList, getLists, updateList, deleteList } from "../../SendgridOps"

function ListForm(props) {
  const handleSubmit = (e) => {
  };

  const importCSV = () => {
  };

  const handleChange = (e) => {
    props.setListData({
      ...props.listData,
      [e.target.name]: e.target.value
    })
  };

  const handleCheckBox = () => {
    props.setListData({
      ...props.listData,
      ccBool: !props.listData.ccBool
    })
  };

  const handleNext = (e) => {
    e.preventDefault()
    props.setStage({
      ...props.stage,
      onListForm: !props.stage.onListForm,
      onRecipientForm: !props.stage.onRecipientForm
    })
  }

  return (
    <div
      style={{
        minWidth: '600px',
        maxWidth: '750px',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <button onClick={(e) => handleNext(e)}>NEXT</button>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          value={props.listData.name}
          placeholder="Enter Class Name"
          onChange={handleChange}
          required
        />
      </form>
      <div
        className="checkboxDiv"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <input
          type="checkbox"
          name="checkbox"
          checked={props.listData.ccBool}
          value={props.listData.ccBool}
          onChange={handleCheckBox}
        />{' '}
        <h5>CC Me On Rocket Emails</h5>
      </div>
      <div className="fileInputDiv">
        <input
          type="file"
          name="file"
          // this ref lets us update input value
          // w/o adding props or re-rendering
          ref={(input) => {
            // filesInput = input;
          }}
          style={{ border: '1px solid black', marginRight: '1rem' }}
          onChange={handleChange}
          placeholder={null}
        />
        <button onClick={importCSV}>Upload</button>
      </div>
    </div>
  );
}

// TODO ===== CONVERT TO HOOK
// TODO ===== REFACTOR TO USE MATERIAL-UI
// TODO ===== BREAK METHODS AND COMPONENTS INTO OWN FOLDERS?
// class ListForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       csvFile: undefined,
//       students: [],
//       checkboxBool: false,
//       classListInput: '',
//       classListName: '',
//     };
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     this.setState({
//       classListName: this.state.classListInput,
//       classListInput: '',
//     });
//   };

//   handleChange = (event) => {
//     if (event.target.name === 'classListTextInput') {
//       this.setState({ classListInput: event.target.value });
//     } else {
//       this.setState({
//         csvFile: event.target.files[0],
//       });
//     }
//   };

//   importCSV = () => {
//     const { csvFile } = this.state;
//     // object keys needed for papaparse
//     BigPapa.parse(csvFile, {
//       complete: this.updateStudents,
//       header: true,
//     });
//   };

//   handleCheckBox = () => {
//     this.setState((prevState) => ({
//       checkboxBool: !prevState.checkboxBool,
//     }));
//   };

//   updateStudents = (students) => {
//     const list = students.data;
//     this.setState({ students: list });
//   };

//   handleNext = (e) => {
//     e.preventDefault()
//     this.props.setStage({
//       ...this.props.stage,
//       onListForm: !this.props.stage.onListForm,
//       onRecipientForm: !this.props.stage.onRecipientForm
//     })
//   }

//   render() {
//     return (
//       <div
//         style={{
//           minWidth: '600px',
//           maxWidth: '750px',
//           border: '1px solid black',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-evenly',
//         }}
//       >
//         <button onClick={(e) => this.handleNext(e)}>NEXT</button>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter Class Name"
//             name="classListTextInput"
//             required
//             onChange={this.handleChange}
//           />
//         </form>
//         <div
//           className="checkboxDiv"
//           style={{ display: 'flex', alignItems: 'center' }}
//         >
//           <input
//             type="checkbox"
//             name="checkbox"
//             checked={this.state.checkboxBool}
//             value={this.state.checkboxBool}
//             onChange={this.handleCheckBox}
//           />{' '}
//           <h5>CC Me On Rocket Emails</h5>
//         </div>
//         <div className="fileInputDiv">
//           <input
//             type="file"
//             name="file"
//             // this ref lets us update input value
//             // w/o adding props or re-rendering
//             ref={(input) => {
//               this.filesInput = input;
//             }}
//             style={{ border: '1px solid black', marginRight: '1rem' }}
//             onChange={this.handleChange}
//             placeholder={null}
//           />
//           <button onClick={this.importCSV}>Upload</button>
//         </div>
//       </div>
//     );
//   }
// }

export default ListForm;
