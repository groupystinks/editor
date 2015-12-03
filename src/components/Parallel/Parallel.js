import React, { Component } from 'react';

const styles = require('./Parallel.scss');

class Parallel extends Component {
  render() {
    return (
      <span>
        <div className={styles.first}>
          <div className={styles.second}>
            <div className={styles.third}></div>
          </div>
        </div>
      </span>
    );
  }
}

export default Parallel;
