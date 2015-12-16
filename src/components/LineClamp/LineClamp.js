import clamp from './clamp';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';


export default class LineClamp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    lines: PropTypes.number.isRequired,
  };

  componentDidMount() {
    clamp(ReactDOM.findDOMNode(this.refs.content), {clamp: this.props.lines});
  }

  render() {
    return (
      <div ref="content">
        {this.props.children}
      </div>
    );
  }
}
