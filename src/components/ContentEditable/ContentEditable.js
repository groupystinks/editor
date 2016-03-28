import React, {Component, PropTypes} from 'react';
import findAncestorSourcepos from '../Selection/findAncestorSourcepos';
import findDOMSelectionTextByTag from '../Selection/findDOMSelectionTextByTag';
import nullthrows from 'utils/nullthrows';

export default class ContentEditable extends Component {
  static propTypes = {
    containerProps: PropTypes.object,
    changeHandler: PropTypes.func,
    children: PropTypes.object,
    reactBlocksArr: PropTypes.array,
  }
  _emitChangeEvent = (event) => {
    event.preventDefault();
    const domSelection = document.getSelection();
    if (!domSelection) return;
    const domText = findDOMSelectionTextByTag(domSelection, 'div');
    // isCollapsed: whether or not there is currently any text selected
    const {anchorNode, isCollapsed} = domSelection;
    const sourcepos = nullthrows(findAncestorSourcepos(anchorNode));
    const {changeHandler} = this.props;

    changeHandler(sourcepos, domText);
  }
  render() {
    const {containerProps, containerTagName, reactBlocksArr} = this.props;
    containerProps.onInput = this._emitChangeEvent;
    containerProps.onBlur = this._emitChangeEvent;
    containerProps.ref = (node) => this._contentNode = node;
    containerProps.contentEditable = true;

    return (React.createElement.apply(React,
      [containerTagName, containerProps]
      .concat(reactBlocksArr))
    );
  }
}
