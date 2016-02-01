/*
 * inspired by Espen Hovlandsdal
 * https://github.com/rexxars/commonmark-react-renderer
*/

import React from 'react';

const allTypes = [
  'Html', 'HtmlBlock', 'Text', 'Paragraph', 'Header', 'Softbreak', 'Hardbreak',
  'Link', 'Image', 'Emph', 'Code', 'CodeBlock', 'BlockQuote', 'List', 'Item',
  'Strong', 'HorizontalRule', 'Document'
];

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
  while (!parent.react) {
    parent = parent.parent;
  }

  parent.react.children.push(child);
}

function createReactElement(typename, props, children) {
  const element = React.createElement(typename, props, children);
  return element;
}

function render(block) {
  const walker = block.walker();
  const {sourcePos, escapeHtml, skipHtml} = this;

  const softBreak = React.createElement('br');

  let event, node, entering, leaving, attrs, doc;
}
