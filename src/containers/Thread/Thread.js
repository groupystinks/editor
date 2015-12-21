import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import {Scroller, BlockList} from 'components';
import {loadPassage} from 'redux/modules/word';
import {
  groupsListSelector,
  passageDownloadURLSelector,
  selectedGroupIDSelector,
  selectedThreadIDSelector,
} from 'utils/Selectors';

const styles = require('./Thread.scss');

@connect(
  state => ({
    groups: groupsListSelector(state),
    threads: state.word.threads,
    passageDownloadURL: passageDownloadURLSelector(state),
    selectedGroup: selectedGroupIDSelector(state),
    selectedThread: selectedThreadIDSelector(state)
  }),
  dispatch => bindActionCreators({
    loadPassage,
    pushState,
  }, dispatch)
)
export default class ThreadView extends Component {
  static propTypes = {
    children: PropTypes.object,
    loadPassage: PropTypes.func,
    passageDownloadURL: PropTypes.string,
    pushState: PropTypes.func,
    selectedThread: PropTypes.string,
    threads: PropTypes.array,
  }

  _onThreadSelect = (thread) => {
    const {loadPassage, pushState, selectedGroup} = this.props; //eslint-disable-line
    const passageDownloadURL = thread.download_url;
    pushState(null, `/group/${selectedGroup}/thread/${thread.name}`);
    loadPassage(passageDownloadURL);
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

         {this.props.children}
      </div>
    );
  }
}
