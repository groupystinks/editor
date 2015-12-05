import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Scroller, BlockList} from 'components';

const styles = require('./Group.scss');

@connect(
  state => ({groupData: state.word.groupData})
)
export default class Group extends Component {
  static propTypes = {
    groupData: PropTypes.array,
  }

  _onGroupSelected = () => {};

  render() {
    const {groupData} = this.props;
    return (
      <div className={styles.group}>
      {groupData ? (
        <Scroller>
          <BlockList
            processes={groupData}
            onThreadSelected={this._onGroupSelected}
            selectedThreadTitle="workaround"
          />
         </Scroller>
       ) : null}
       </div>
    );
  }
}
