/**
 *  By https://github.com/guillaumervls/react-infinite-scroll
 */

import React, {Component, PropTypes} from 'react';
import radium from 'radium';
import ReactDOM from 'react-dom';

class InfiniteScroll extends Component {
  static propTypes = {
    onScroll: PropTypes.func,
    handleScroll: PropTypes.func,
    children: PropTypes.node,
    isScrollContainer: PropTypes.bool,
    style: PropTypes.object.isRequired,
  };

 static defaultProps = {
   isScrollContainer: false,
 };

 constructor() {
   super();
   this._lastHeight = 0;
   this._threshold = 250;
 }

 componentDidMount() {
   this._attachListeners();
 }

 componentWillUnmount() {
   this._detachListeners();
 }

 _attachListeners() {
   window.addEventListener('scroll', this._onScrollHandler);
   window.addEventListener('resize', this._update);
   this._update();
 }

 _detachListeners() {
   window.removeEventListener('scroll', this._onScrollHandler);
   window.removeEventListener('resize', this._update);
 }

 // onScroll event trigger with throtle, need better balance
 // between performance and ux.
 _onScrollHandler = (event) => {
   this.props.onScroll(event);
   this._update();
 }

 _update = () => {
   const el = ReactDOM.findDOMNode(this);
   const height = el.scrollHeight;
   const isPastThreshold = (el.scrollHeight -
     el.offsetHeight -
     el.scrollTop
   ) < Number(this._threshold);

   if ((!this._lastHeight || this._lastHeight < height) && isPastThreshold) {
     // call loadMore after _detachListeners to allow
     // for non-async loadMore functions
     this._lastHeight = height;
   }
 };

 render() {
   const style = this.props.isScrollContainer ? {overflow: 'auto'} : null;
   return (
     <div
       style={[this.props.style, style]}>
       {this.props.children}
     </div>
   );
 }
}

export default radium(InfiniteScroll);
