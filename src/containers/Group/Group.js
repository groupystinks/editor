import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import {loadThread} from 'redux/modules/word';
import {Scroller, BlockList} from 'components';
import {
  selectedGroupIDSelector
} from 'utils/Selectors';

@connect(
  state => ({
    groups: state.word.groups,
    threadLoaded: state.word.threadLoaded,
    router: state.router,
    selectedGroup: selectedGroupIDSelector(state)
  }),
  dispatch => bindActionCreators({
    loadThread,
    pushState
  }, dispatch)
)
export default class Group extends Component {
  static propTypes = {
    children: PropTypes.object,
    loadThread: PropTypes.func,
    groups: PropTypes.array,
    threadLoaded: PropTypes.bool,
    router: PropTypes.object,
    selectedGroup: PropTypes.string,
    pushState: PropTypes.func
  }

  componentDidMount() {
    const {loadThread, threadLoaded, router} = this.props; //eslint-disable-line
    if (router && router.params.groupID && !threadLoaded) {
      loadThread(router.params.groupID);
    }
  }

  // deprecated
  _extractGroupIndex = (selectedGroupID) => {
    const {groups} = this.props;
    const selectedGroupIndex = groups
      .map((group, index) => {
        if (group.id === selectedGroupID) {
          return index;
        }})
      .join('');
    return selectedGroupIndex;
  }

  _onGroupSelected = (group) => {
    const {loadThread, pushState} = this.props; //eslint-disable-line
    pushState(null, `/group/${group.id}`);
    loadThread(group.id);
  }

  render() {
    const {groups, selectedGroup} = this.props;
    return (
      <Scroller>
        <BlockList
          blocks={groups}
          onBlockSelect={this._onGroupSelected}
          selectedBlockTitle={selectedGroup}
        />
      </Scroller>
    );
  }
}
