/**
 *  By https://github.com/guillaumervls/react-infinite-scroll
 */

import React, {Component, PropTypes, findDOMNode} from 'react';

class InfiniteScroll extends Component {
  static propTypes = {
    onScroll: PropTypes.func.isRequired,
    threshold: PropTypes.number.isRequired,

    children: PropTypes.node,
    isScrollContainer: PropTypes.bool,
    style: PropTypes.object,
  };

 static defaultProps = {
   isScrollContainer: false,
   threshold: 250,
 };

 componentDidMount() {
   this._attachListeners();
 }

 componentWillUnmount() {
   this._detachListeners();
 }

 _attachListeners() {
   window.addEventListener('resize', this._update);
   this._update();
 }

 _detachListeners() {
   window.removeEventListener('resize', this._update);
 }

 _onScroll = (event: Event) => {
   this.props.onScroll(event);
   this._update();
 };

 _lastHeight = 0;

 _update = () => {
   const el = findDOMNode(this);
   const height = el.scrollHeight;
   const isPastThreshold = (el.scrollHeight -
     el.offsetHeight -
     el.scrollTop
   ) < Number(this.props.threshold);

   if ((!this._lastHeight || this._lastHeight < height) && isPastThreshold) {
     // call loadMore after _detachListeners to allow
     // for non-async loadMore functions
     this._lastHeight = height;
   }
 };

 render(): any {
   const style = this.props.isScrollContainer ? {overflow: 'auto'} : null;
   return (
     <div
       onScroll={this._onScroll}
       style={[this.props.style, style]}>
       {this.props.children}
     </div>
   );
 }
}

export default InfiniteScroll;
