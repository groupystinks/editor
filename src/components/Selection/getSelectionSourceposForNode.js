/*
 * get data sourcepos from a node
*/

export default function getSelectionSourceposForNode(node) {
  return node instanceof Element ? node.getAttribute('data-sourcepos') : null;
}
