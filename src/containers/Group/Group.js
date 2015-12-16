import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import {Thread} from 'containers';
import {Scroller, BlockList} from 'components';

const styles = require('./Group.scss');

@connect(
  state => ({groupData: state.word.groupData}),
  dispatch => bindActionCreators({
    pushState
  }, dispatch)
)
export default class Group extends Component {
  static propTypes = {
    children: PropTypes.object,
    groupData: PropTypes.array,
    pushState: PropTypes.func
  }

  _onGroupSelected = (group) => {
    this.props.pushState(null, `/thread/${group.name}`);
  };

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
         <div className={styles.thread}>
           <Thread/>
         </div>
       </div>
    );
  }
}
