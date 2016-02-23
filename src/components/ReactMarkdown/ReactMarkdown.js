import React, {Component, PropTypes} from 'react';
import ReactRenderer from 'helpers/commonmarkReactRenderer';

export default class ReactMarkdown extends Component {
  static displayName = 'ReactMarkdown'

  static propTypes = {
    ast: PropTypes.object.isRequired,
    className: PropTypes.string,
    containerTagName: PropTypes.string,
  }

  static defaultProps = {
    containerTagName: 'div'
  }

  render() {
    const containerProps = {};
    const renderer = new ReactRenderer();

    if (this.props.className) {
      containerProps.className = this.props.className;
    }

    return React.createElement.apply(React,
        [this.props.containerTagName, containerProps]
            .concat(renderer.render(this.props.ast))
    );
  }
}
