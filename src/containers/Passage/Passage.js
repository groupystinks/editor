import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({
    passages: state.word.passages,
  })
)
export default class Passage extends Component {
  static propTypes = {
    passages: PropTypes.string,
  }
  render() {
    const {passages} = this.props;
    return (
      <div>
        {passages}
      </div>
    );
  }
}
