import React, { Component, PropTypes } from 'react';
import { Group, Header } from 'containers';

export default class Home extends Component {
  static propTypes = {
    children: PropTypes.object,
  }
  render() {
    return (
      <div>
        <Header />
        <Group />
      </div>
    );
  }
}
