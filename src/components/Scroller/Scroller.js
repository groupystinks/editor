/**
 * A fancy, Facebook-style scrollbar.
 *
 * Known issues:
 * - scrolling over the scrollbar does not work
 * - clicking the scrollbar not on the thumb doesn't scroll
 */

// Inspired by:
// https://github.com/leoselig/jsFancyScroll/

import React, {Component, PropTypes} from 'react';
import radium from 'radium';
import {InfiniteScroll} from 'components';
import Colors from 'theme/ColorPlate';
import ReactDOM from 'react-dom';


const takeColumnOut = radium.keyframes({
  '0%': {flexGrow: 1},
  '100%': {flexGrow: 0.00001}
});

const scrollBarWidth = '15px';

const styles = {
  displayNone: {
    flexGrow: 0.00001,
    minWidth: 0,
    animation: takeColumnOut + ' .3s 1 ease',
  },

  scroller: {
    borderRight: '1px solid ' + Colors.gray1,
    flex: 1,
    height: '100%',
    flexGrow: 1,
    maxWidth: '250px',
    minWidth: '200px',
    overflow: 'hidden',
    position: 'relative',
  },

  scrollbar: {
    bottom: 0,
    opacity: 0,
    position: 'absolute',
    right: '0',
    top: 0,
    transition: 'opacity .25s',
    width: '8px',
  },

  scrollbarHover: {
    opacity: 1,
  },

  thumb: {
    background: 'rgba(0, 0, 0, .4)',
    borderRadius: '4px',
    position: 'absolute',
    right: '0',
    width: '8px',
  },

  viewport: {
    boxSizing: 'content-box',
    height: '100%',
    marginRight: '-' + scrollBarWidth,
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingRight: scrollBarWidth,
    width: '100%',
  },

  content: {
    marginRight: '-' + scrollBarWidth,
  },
};


class Scroller extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
  };

  constructor() {
    super();

    this.state = {
      scrollTop: 0,
      scrollHeight: 1,
      offsetHeight: 1,
    };
  }

  _previousUserSelect = '';
  _isMouseDown = false;
  _lastPageY = 0;

  _attachBodyListeners = () => {
    document.addEventListener('mouseup', this._onDocumentMouseUp);
    document.addEventListener('mouseleave', this._onDocumentMouseUp);
    document.addEventListener('mousemove', this._onDocumentMouseMove);
    document.addEventListener('selectstart', this._onDocumentSelectStart);
    this._previousUserSelect = (document.body.style: any).userSelect;
    (document.body.style: any).userSelect = 'none';
  }

  _detachBodyListeners = () => {
    document.removeEventListener('mouseup', this._onDocumentMouseUp);
    document.removeEventListener('mouseleave', this._onDocumentMouseUp);
    document.removeEventListener('mousemove', this._onDocumentMouseMove);
    document.removeEventListener('selectstart', this._onDocumentSelectStart);
  }

  _onScroll = () => {
    const viewport = ReactDOM.findDOMNode(this.refs.viewport);
    this.setState({
      scrollTop: viewport.scrollTop,
      scrollHeight: viewport.scrollHeight,
      offsetHeight: viewport.offsetHeight,
    });
  };

  _onDocumentSelectStart = (event) => {
    event.preventDefault();
  };

  _onScrollbarMouseDown = (event) => {
    this._attachBodyListeners();
    this._isMouseDown = true;
    this._lastPageY = event.pageY;
    this.setState({isMouseDown: true});
  };

  _onDocumentMouseUp = () => {
    this._detachBodyListeners();
    this._isMouseDown = false;
    this.setState({isMouseDown: false});
  };

  _onDocumentMouseMove = (event) => {
    if (this._isMouseDown) {
      const scale = this._getScale();
      const diff = event.pageY - this._lastPageY;
      const viewport = ReactDOM.findDOMNode(this.refs.viewport);
      const newScrollTop = (viewport.scrollTop + diff / scale);

      viewport.scrollTop = Math.max(0, newScrollTop);
      this._lastPageY = event.pageY;
    }
  };

  _onScrollerMouseEnter = () => {
    this.setState({isHover: true});
  };

  _onScrollerMouseLeave = () => {
    this.setState({isHover: false});
  };

  _getScale = () => {
    return this.state.offsetHeight / this.state.scrollHeight;
  }

  render() {
    const scale = this._getScale();
    const thumbHeight = this.state.offsetHeight * scale;
    const thumbTop = this.state.scrollTop * scale;

    return (
      <div
        onMouseEnter={this._onScrollerMouseEnter}
        onMouseLeave={this._onScrollerMouseLeave}
        style={[
          styles.scroller,
          false && styles.displayNone /* display none disabled */
        ]}>
        <div
          onMouseDown={this._onScrollbarMouseDown}
          style={[
            styles.scrollbar,
            (this.state.isHover || this.state.isMouseDown) && styles.scrollbarHover
          ]}>
          <div
            style={[styles.thumb, {height: thumbHeight, top: thumbTop}]}
          />
        </div>
        <InfiniteScroll
          onScroll={this._onScroll}
          ref="viewport"
          style={styles.viewport}>
          <div style={styles.content}>
            {this.props.children}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default radium(Scroller);
