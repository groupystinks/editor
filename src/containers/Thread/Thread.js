import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import {Scroller, BlockList} from 'components';
import {initPassage, loadPassage} from 'redux/modules/word';
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
    passageLoaded: state.word.passageLoaded,
    router: state.router,
    selectedGroup: selectedGroupIDSelector(state),
    selectedThread: selectedThreadIDSelector(state)
  }),
  dispatch => bindActionCreators({
    initPassage,
    loadPassage,
    pushState,
  }, dispatch)
)
export default class ThreadView extends Component {
  static propTypes = {
    children: PropTypes.object,
    initPassage: PropTypes.func,
    loadPassage: PropTypes.func,
    passageDownloadURL: PropTypes.string,
    passageLoaded: PropTypes.bool,
    pushState: PropTypes.func,
    router: PropTypes.object,
    selectedThread: PropTypes.string,
    threads: PropTypes.array,
  }

  componentDidMount() {
    const {initPassage, passageLoaded, router} = this.props; //eslint-disable-line
    if (router && router.params.threadID && !passageLoaded) {
      initPassage(router.params);
    }
  }

  _onThreadSelect = (thread) => {
    const {loadPassage, pushState, selectedGroup} = this.props; //eslint-disable-line
    pushState(null, `/group/${selectedGroup}/thread/${thread.name}`);
    loadPassage({
      groupID: selectedGroup,
      threadID: thread.id
    });
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
