import React, {Component, PropTypes} from 'react';
import {ContentEditable} from 'components';

export default class ReactMarkdown extends Component {
  static displayName = 'ReactMarkdown'

  static propTypes = {
    reactBlocksArr: PropTypes.array.isRequired,
    className: PropTypes.string,
    isEditable: PropTypes.bool,
    containerTagName: PropTypes.string,
  }

  static defaultProps = {
    containerTagName: 'div',
    isEditable: false,
  }

  render() {
    const containerProps = {};
    const {changeHandler, className, containerTagName, isEditable, reactBlocksArr} = this.props;

    containerProps.className = className;

    return (isEditable ?
      <ContentEditable
        changeHandler={changeHandler}
        containerProps={containerProps}
        containerTagName={containerTagName}
        reactBlocksArr={reactBlocksArr}/> :
      React.createElement.apply(React,
        [containerTagName, containerProps]
            .concat(reactBlocksArr))
    );
  }
}
