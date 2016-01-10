import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import {connect} from 'react-redux';
import {passageContentSelector} from 'utils/Selectors';

const styles = require('./Passage.scss');

@connect(
  state => ({
    passage: passageContentSelector(state),
  })
)
export default class Passage extends Component {
  static propTypes = {
    passage: PropTypes.string,
  }
  render() {
    const {passage} = this.props;
    return (
      <div className={styles.passage}>
        {passage ?
        <div className={styles.contentContainer}>
          <div className={styles.contentMarked}>
            <ReactMarkdown source={passage}/>
          </div>
        </div>
        : null}
      </div>
    );
  }
}
