import React, { Component, PropTypes } from 'react';
import { Group } from 'containers';

const styles = require('./Home.scss');

export default class Home extends Component {
  static propTypes = {
    children: PropTypes.object,
  }
  render() {
    return (
      <div>
        <div className={styles.group}>
          <Group/>
          {this.props.children}
        </div>
      </div>
    );
  }
}
