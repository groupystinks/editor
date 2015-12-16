/*
 * to solve 'Radium: userAgent should be supplied for server-side rendering.'
 * https://github.com/FormidableLabs/radium/issues/429
*/

import React from 'react';
import radium from 'radium';

class userAgentWrapper extends React.Component {
  static propTypes = {
    children: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default radium(userAgentWrapper);
