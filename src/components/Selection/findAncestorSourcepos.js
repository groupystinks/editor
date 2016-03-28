import getSelectionSourceposForNode from './getSelectionSourceposForNode';

export default function findAncestorSourcepos(node) {
  while (node && node !== document.documentElement) {
    const sourcepos = getSelectionSourceposForNode(node);
    if (sourcepos != null) { // eslint-disable-line
      return sourcepos;
    }
    node = node.parentNode; // eslint-disable-line
  }
  return null;
}
