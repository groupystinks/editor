import React, { Component } from 'react';
import { Header } from 'containers';

class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        <Header />
      </div>
    );
  }
}

export default Home;
