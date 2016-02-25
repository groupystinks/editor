import React, {Component, PropTypes} from 'react';
import {ContentEditable} from 'components';
import ReactRenderer from 'helpers/commonmarkReactRenderer';

export default class ReactMarkdown extends Component {
  static displayName = 'ReactMarkdown'

  static propTypes = {
    ast: PropTypes.object.isRequired,
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
    const {changeHandler, className, containerTagName, isEditable} = this.props;
    const renderer = new ReactRenderer();
    const listOfBlocks = renderer.render(this.props.ast);

    containerProps.className = className;

    return (isEditable ?
      <ContentEditable
        changeHandler={changeHandler}
        containerProps={containerProps}
        containerTagName={containerTagName}
        listOfBlocks={listOfBlocks}/> :
      React.createElement.apply(React,
        [containerTagName, containerProps]
            .concat(listOfBlocks))
    );
  }
}
