import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {passageContentSelector} from 'utils/Selectors';
import {ReactMarkdown} from 'components';
import {onEditPassage} from 'redux/modules/word';

const styles = require('./Passage.scss');

@connect(
  state => ({
    passage: passageContentSelector(state),
  }),
  dispatch => bindActionCreators({
    onEditPassage
  }, dispatch)
)
export default class Passage extends Component {
  static propTypes = {
    passage: PropTypes.array,
    onEditPassage: PropTypes.func,
  }
  onChangeHandler = (sourcepos, domText) => {
    const {onEditPassage} = this.props; //eslint-disable-line
    // onEditPassage(sourcepos, domText);
  }
  render() {
    const {passage} = this.props; //eslint-disable-line
    return (
      <div className={styles.passage}>
        {passage ?
        <div className={styles.contentContainer}>
          <div className={styles.contentMarked}>
            <ReactMarkdown
              reactBlocksArr={passage}
              isEditable={true}
              changeHandler={this.onChangeHandler}/>
          </div>
        </div>
        : null}
      </div>
    );
  }
}
