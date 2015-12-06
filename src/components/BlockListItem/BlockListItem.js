import Colors from 'theme/ColorPlate';
import {LineClamp} from 'components';
import radium from 'radium';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

const isFirefox = __SERVER__ ? false : navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

const styles = {
  item: {
    root: {
      display: 'block',
      lineHeight: 1.6,
      margin: '0 8px 8px 8px',
    },

    image: {
      position: 'relative',
      paddingRight: '5px',
      verticalAlign: 'top',
    },

    lineClampWrapper: {
      display: 'inline-block',
    },

    rootFirst: {
      borderTop: 'none',
    },

    inner: {
      borderRadius: '8px',
      padding: '8px 12px 12px 12px',

      ':hover': {
        background: Colors.whiteSmoke,
      }
    },

    innerIsSelected: {
      background: Colors.whiteSmoke.darken(8),
      color: Colors.black,

      ':hover': {
        background: Colors.whiteSmoke.darken(8),
      }
    },

    text: {
      fontSize: '14px',
    },
  },
};

class BlockListItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    process: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this._scrollIntoView();
  }

  componentDidUpdate() {
    this._scrollIntoView();
  }

  _scrollIntoView = () => {
    if (this.props.isSelected) {
      if (ReactDOM.findDOMNode(this).scrollIntoViewIfNeeded) {
        ReactDOM.findDOMNode(this).scrollIntoViewIfNeeded(false);
      } else {
        ReactDOM.findDOMNode(this).scrollIntoView(false);
      }
    }
  }

  _onClick = () => {
    this.props.onClick(this.props.index, this.props.process);
  };

  render() {
    const pro = this.props.process;
    return (
      <li
        key={pro.name}
        onClick={this._onClick}
        style={styles.item.root}>
        <div style={[
          styles.item.inner,
          this.props.isSelected && styles.item.innerIsSelected
        ]}>
          {isFirefox ?
          (<span style={styles.item.snippet}>
            {pro.name}{' '}
          </span>) : (
          <span style={styles.item.lineClampWrapper}>
            <LineClamp lines={2} style={styles.item.text}>
              <span style={styles.item.snippet}>
                {pro.name}{' '}
              </span>
            </LineClamp>
          </span>)}
        </div>
      </li>
    );
  }
}

export default radium(BlockListItem);
