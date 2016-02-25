import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {passageContentSelector} from 'utils/Selectors';
import {ReactMarkdown} from 'components';

const styles = require('./Passage.scss');

@connect(
  state => ({
    passage: passageContentSelector(state),
  })
)
export default class Passage extends Component {
  static propTypes = {
    passage: PropTypes.object,
  }
  onChangeHandler = (event) => {
    console.log('event.target.value', event.target.value);
  }
  render() {
    const {passage} = this.props;
    return (
      <div className={styles.passage}>
        {passage ?
        <div className={styles.contentContainer}>
          <div className={styles.contentMarked}>
            <ReactMarkdown
              ast={passage}
              isEditable={true}
              changeHandler={this.onChangeHandler}/>
          </div>
        </div>
        : null}
      </div>
    );
  }
}
