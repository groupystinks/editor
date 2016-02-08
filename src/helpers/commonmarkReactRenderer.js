/*
 * by Espen Hovlandsdal
 * https://github.com/rexxars/commonmark-react-renderer
*/

import React from 'react';

function tag(node, tagname, props, children) {
  node.react = {
    props,
    tag: tagname,
    children: children || []
  };
}

function isGrandChildOfList(node) {
  const grandparent = node.parent.parent;
  return (
      grandparent &&
      grandparent.type === 'List' &&
      grandparent.listTight
  );
}

function addAsChild(node, child) {
  let parent = node;
  do {
    parent = parent.parent;
  } while (!parent.react);

  parent.react.children.push(child);
}

function createReactElement(typename, props, children) {
  const args = [typename, props].concat(children);
  const element = React.createElement.apply(React, args);
  return element;
}

function renderNodes(block) {
  const walker = block.walker();
  const softBreak = React.createElement('br');

  let event, node, entering, leaving, attrs, doc, infoWords; //eslint-disable-line
  while ((event = walker.next())) {   //eslint-disable-line
    entering = event.entering;
    leaving = !entering;
    node = event.node;
    attrs = {};

    // define document if not yet defined.
    if (!doc) {
      doc = node;
      doc.react = {children: []};
    }

    // sourcepo is must-have
    if (node.sourcepos) {
      const position = node.sourcepos;
      attrs['data-sourcepos'] = [
        position[0][0], ':', position[0][1], '-',
        position[1][0], ':', position[1][1]
      ].map(String).join('');
    }

    // no paragraphs tag inside list
    if (node.type === 'Paragraph' && isGrandChildOfList(node)) {
      continue;
    }

    // when reenter parent from a child
    if (leaving) {
      if (node !== doc) {
        addAsChild(node, createReactElement(
          node.react.tag,
          node.react.props,
          node.react.children
        ));
      }

      continue;
    }

    // entering new node
    switch (node.type) {
      case 'Html':
      case 'HtmlBlock':
          // ignore html block
        break;
      case 'Text':
        addAsChild(node, node.literal);
        break;
      case 'Paragraph':
        tag(node, 'p', attrs);
        break;
      case 'Heading':
        tag(node, 'h' + node.level, attrs);
        break;
      case 'Softbreak':
        addAsChild(node, softBreak);
        break;
      case 'Hardbreak':
        addAsChild(node, softBreak);
        break;
      case 'Strong':
        tag(node, 'strong', attrs);
        break;
      case 'Link':
        attrs.href = node.destination;
        if (node.title) {
          attrs.title = node.title;
        }
        tag(node, 'a', attrs);
        break;
      case 'Image':
        attrs.src = node.destination;
        if (node.title) {
          attrs.title = node.title;
        }
        tag(node, 'img', attrs);
        break;
      case 'Emph':
        tag(node, 'em', attrs);
        break;
      case 'Code':
        addAsChild(node, createReactElement(
          'code',
          attrs,
          [node.literal]
        ));
        break;
      case 'CodeBlock':
        infoWords = node.info ? node.info.split(/ +/) : [];
        if (infoWords.length > 0 && infoWords[0].length > 0) {
          attrs.className = 'language-' + infoWords[0];
        }

        const code = createReactElement('code', attrs, [node.literal]);
        addAsChild(node, createReactElement('pre', {}, [code]));
        break;
      case 'BlockQuote':
        tag(node, 'blockquote', attrs);
        break;
      case 'List':
        const start = node.listStart;
        if (start !== null && start !== 1) {
          attrs.start = start.toString();
        }
        tag(node, node.listType === 'Bullet' ? 'ul' : 'ol', attrs);
        break;
      case 'Item':
        tag(node, 'li', attrs);
        break;
      case 'HorizontalRule':
        addAsChild(node, createReactElement('hr', attrs));
        break;
      case 'Document':
        break;
      default:
        throw new Error('Unknown node type "' + node.type + '"');
    }
  }

  return doc.react.children;
}

function ReactRenderer() {
  return {
    render: renderNodes
  };
}

export default ReactRenderer;
