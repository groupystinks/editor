import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import {Scroller, BlockList} from 'components';
import {
  selectedGroupIDSelector,
  selectedThreadIDSelector,
  groupsListSelector
} from 'utils/Selectors';

const styles = require('./Thread.scss');

@connect(
  state => ({
    groups: groupsListSelector(state),
    threads: state.word.threads,
    selectedGroup: selectedGroupIDSelector(state),
    selectedThread: selectedThreadIDSelector(state)
  }),
  dispatch => bindActionCreators({
    pushState
  }, dispatch)
)
export default class ThreadView extends Component {
  static propTypes = {
    children: PropTypes.object,
    selectedThread: PropTypes.string,
    threads: PropTypes.array,
  }

  _onThreadSelect = (thread) => {
    const {pushState, selectedGroup} = this.props; //eslint-disable-line
    pushState(null, `/group/${selectedGroup}/thread/${thread.name}`);
    // `/thread/${message.threadID}/message/${message.id}/`
  };

  render() {
    const {threads, selectedThread} = this.props;
    return (
      <div className={styles.thread}>
        {threads ? (
        <Scroller>
          <BlockList
            blocks={threads}
            onBlockSelect={this._onThreadSelect}
            selectedThreadTitle={selectedThread}
          />
         </Scroller>
         ) : null}
      </div>
    );
  }
}
