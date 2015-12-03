import React from 'react';

// components
import { Parallel } from 'components';

const styles = require('./Header.scss');

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>
        <span>吶喊{' '}</span>
        <Parallel />
        <span className={styles.logoEng}>{' '}Skrik</span>
      </span>
    </header>
  );
};

export default Header;
