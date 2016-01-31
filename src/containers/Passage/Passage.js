import React, { Component, PropTypes } from 'react';
import {ContentEditable} from 'components';
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
            <ContentEditable
              content={passage}
              changeHandler={this.onChangeHandler}
              isEditable={true}/>
          </div>
        </div>
        : null}
      </div>
    );
  }
}
