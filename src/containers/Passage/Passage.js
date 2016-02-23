import React, { Component, PropTypes } from 'react';
// import {ContentEditable} from 'components';
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
  onChangeHandler = () => {
    // this.setState({passage})
  }
  render() {
    const {passage} = this.props;
    return (
      <div className={styles.passage}>
        {passage ?
        <div className={styles.contentContainer}>
          <div className={styles.contentMarked}>
            {/* <ContentEditable
              content={passage}
              changeHandler={this.onChangeHandler}
              isEditable={true}/> */}
            <ReactMarkdown
              ast={passage}
              />
          </div>
        </div>
        : null}
      </div>
    );
  }
}
