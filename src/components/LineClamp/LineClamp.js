import clamp from './clamp';
import React, {Component, PropTypes, findDOMNode} from 'react';


export default class LineClamp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    lines: PropTypes.number.isRequired,
  };

  componentDidMount() {
    clamp(findDOMNode(this.refs.content), {clamp: this.props.lines});
  }

  render(): any {
    return (
      <div ref="content">
        {this.props.children}
      </div>
    );
  }
}
