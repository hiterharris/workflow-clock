import React, { Component } from 'react';
import Picker from 'react-mobile-picker';

export default class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        number: 0,
      },
      optionGroups: {
        number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      }
    };
  }

  handleChange = (name, value) => {
    this.setState(({ valueGroups }) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
  };

  submit = () => {
    console.log(this.state.valueGroups);
  }

  render() {
    const { optionGroups, valueGroups } = this.state;

    return (
      <>
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={this.handleChange} />
        <button onClick={this.submit}>Submit</button>
      </>
    );
  }
}