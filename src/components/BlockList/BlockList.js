import React, {Component, PropTypes} from 'react';
import {BlockListItem} from 'components';

const styles = require('./BlockList.scss');

class BlockList extends Component {
  static propTypes = {
    blocks: PropTypes.array.isRequired,
    onBlockSelect: PropTypes.func.isRequired,
    selectedBlockTitle: PropTypes.string,
  };

  _onThreadClick = (index, passage) => {
    this.props.onBlockSelect(passage);
  };

  render() {
    const {blocks, selectedBlockTitle} = this.props;
    return (
      <ul className={styles.list}>
        {blocks.map((block, index) => (
          <BlockListItem
            index={index}
            key={index}
            block={block}
            isSelected={block.name === selectedBlockTitle}
            onClick={this._onThreadClick}
          />
        ))}
      </ul>
    );
  }
}

export default BlockList;
