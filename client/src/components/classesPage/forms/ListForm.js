import React, { Component } from 'react';
import BigPapa from 'papaparse';
// TODO ===== CONVERT TO HOOK
// TODO ===== REFACTOR TO USE MATERIAL-UI
// TODO ===== BREAK METHODS AND COMPONENTS INTO OWN FOLDERS?

class ListForm extends Component {
  constructor() {
    super();
    this.state = {
      csvFile: undefined,
      students: [],
      checkboxBool: false,
      classListInput: '',
      classListName: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      classListName: this.state.classListInput,
      classListInput: '',
    });
  };

  handleChange = (event) => {
    if (event.target.name === 'classListTextInput') {
      this.setState({ classListInput: event.target.value });
    } else {
      this.setState({
        csvFile: event.target.files[0],
      });
    }
  };

  importCSV = () => {
    const { csvFile } = this.state;
    // object keys needed for papaparse
    BigPapa.parse(csvFile, {
      complete: this.updateStudents,
      header: true,
    });
  };

  handleCheckBox = () => {
    this.setState((prevState) => ({
      checkboxBool: !prevState.checkboxBool,
    }));
  };

  updateStudents = (students) => {
    const list = students.data;
    this.setState({ students: list });
  };

  render() {
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
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter Class Name"
            name="classListTextInput"
            required
            onChange={this.handleChange}
          />
        </form>
        <div
          className="checkboxDiv"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <input
            type="checkbox"
            name="checkbox"
            checked={this.state.checkboxBool}
            value={this.state.checkboxBool}
            onChange={this.handleCheckBox}
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
              this.filesInput = input;
            }}
            style={{ border: '1px solid black', marginRight: '1rem' }}
            onChange={this.handleChange}
            placeholder={null}
          />
          <button onClick={this.importCSV}>Upload</button>
        </div>
      </div>
    );
  }
}

export default ListForm;
