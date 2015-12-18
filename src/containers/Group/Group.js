import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import {loadThread} from 'redux/modules/word';
import {Scroller, BlockList} from 'components';
import {selectedGroupIDSelector} from 'utils/Selectors';

const styles = require('./Group.scss');

@connect(
  state => ({
    groups: state.word.groups,
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
    selectedGroup: PropTypes.string,
    pushState: PropTypes.func
  }

  _onGroupSelected = (group) => {
    const {loadThread, pushState} = this.props; //eslint-disable-line
    pushState(null, `/group/${group.name}`);
    loadThread(group.name);
  };

  render() {
    const {groups, selectedGroup} = this.props;
    return (
      <div className={styles.group}>
      {groups ? (
        <Scroller>
          <BlockList
            blocks={groups}
            onBlockSelect={this._onGroupSelected}
            selectedBlockTitle={selectedGroup}
          />
        </Scroller>
       ) : null}
       </div>
    );
  }
}
