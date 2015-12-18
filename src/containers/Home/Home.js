import React, { Component, PropTypes } from 'react';
import { Group } from 'containers';

export default class Home extends Component {
  static propTypes = {
    children: PropTypes.object,
  }
  render() {
    return (
      <div>
        <Group/>
        {this.props.children}
      </div>
    );
  }
}
