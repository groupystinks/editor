import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { isGroupLoaded, loadGroup as loadGroup } from 'redux/modules/word';
import { InfoBar } from 'components';
import { Header } from 'containers';
import connectData from 'helpers/connectData';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!isInfoLoaded(getState())) {
    promises.push(dispatch(loadInfo()));
  }
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  if (!isGroupLoaded(getState())) {
    promises.push(dispatch(loadGroup()));
  }

  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  {logout})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Header/>
        <div>
          {this.props.children}
        </div>
        <InfoBar/>
      </div>
    );
  }
}
