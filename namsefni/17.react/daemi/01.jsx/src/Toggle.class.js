import React, { Component } from 'react';

export class Toggle extends Component {
  state = { toggled: true }
  handleClick = () => {
    this.setState(prev => ({
      toggled: !prev.toggled
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.toggled ? 'ON' : 'OFF'}
      </button>
    );
  }
}
