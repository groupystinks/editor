import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import {Scroller, BlockList} from 'components';

export default class ThreadView extends Component {
  static propTypes = {
    // groupData: PropTypes.array,
    children: PropTypes.object,
  }

  _onThreadSelect = () => {};

  render() {
    return (
      <div>
        <Scroller>
          <BlockList
            processes={[]}
            onThreadSelected={this._onThreadSelect}
            selectedThreadTitle="workaround"
          />
         </Scroller>
      </div>
    );
  }
}
