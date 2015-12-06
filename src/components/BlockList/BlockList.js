import React, {Component, PropTypes} from 'react';
import {BlockListItem} from 'components';

const styles = require('./BlockList.scss');

class BlockList extends Component {
  static propTypes = {
    processes: PropTypes.array.isRequired,
    onThreadSelected: PropTypes.func.isRequired,
    selectedThreadTitle: PropTypes.string,
  };

  _onThreadClick = (index, passage) => {
    this.props.onThreadSelected(passage);
  };

  render() {
    return (
      <ul className={styles.list}>
        {this.props.processes.map((pro, index) => (
          <BlockListItem
            index={index}
            key={index}
            process={pro}
            isSelected={pro.name === this.props.selectedThreadTitle}
            onClick={this._onThreadClick}
          />
        ))}
      </ul>
    );
  }
}

export default BlockList;
