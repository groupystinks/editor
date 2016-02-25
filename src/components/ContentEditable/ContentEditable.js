/*
 * copyright 2014-2016 Ophir LOJKINE
 * https://github.com/lovasoa/react-contenteditable
*/

import React, {Component, PropTypes} from 'react';

export default class ContentEditable extends Component {
  static propTypes = {
    containerProps: PropTypes.object,
    changeHandler: PropTypes.func,
    children: PropTypes.object,
    listOfBlocks: PropTypes.array,
  }
  constructor() {
    super();
    this._contentNode = {};
    this._lastContentNode = {};
  }
  // shouldComponentUpdate(nextProps) {
  //   return (
  //     !this._contentNode ||
  //     nextProps.content !== this._contentNode.innerHTML
  //   );
  // }
  // componentDidUpdate() {
  //   const {content} = this.props;
  //   if (this._contentNode && content !== this._contentNode.innerHTML) {
  //     this._contentNode.innerHTML = content;
  //   }
  // }
  _emitChangeEvent = (event) => {
    if (!this._contentNode) return;
    const {changeHandler} = this.props;
    const content = this._contentNode.innerHTML;
    if (changeHandler && content !== this._lastContentNode) {
      event.target = {value: content};
      changeHandler(event);
    }
    this._lastContentNode = content;
  }
  render() {
    const {containerProps, containerTagName, listOfBlocks} = this.props;
    containerProps.onInput = this._emitChangeEvent;
    containerProps.onBlur = this._emitChangeEvent;
    containerProps.ref = (node) => this._contentNode = node;
    containerProps.contentEditable = true;

    return (React.createElement.apply(React,
      [containerTagName, containerProps]
      .concat(listOfBlocks))
    );
  }
}
