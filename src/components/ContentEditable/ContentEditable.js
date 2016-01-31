/*
 * copyright 2014-2016 Ophir LOJKINE
 * https://github.com/lovasoa/react-contenteditable
*/

import React, {Component, PropTypes} from 'react';

export default class ContentEditable extends Component {
  static propTypes = {
    content: PropTypes.string,
    changeHandler: PropTypes.func,
    isEditable: PropTypes.bool,
    children: PropTypes.object,
  }
  constructor() {
    super();
    this._contentNode = null;
    this._lastContentNode = null;
  }
  shouldComponentUpdate(nextProps) {
    return (
      !this._contentNode ||
      nextProps.content !== this._contentNode.innerHTML ||
      this.props.isEditable !== nextProps.isEditable
    );
  }
  componentDidUpdate() {
    const {content} = this.props;
    if (this._contentNode && content !== this._contentNode.innerHTML) {
      this._contentNode.innerHTML = content;
    }
  }
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
    const {children, content, isEditable} = this.props;
    return (
      <div
        contentEditable={isEditable}
        dangerouslySetInnerHTML={{__html: content}}
        onInput={this._emitChangeEvent}
        onBlur={this._emitChangeEvent}
        ref={(node) => this._contentNode = node}>
        {children}
      </div>
    );
  }
}
