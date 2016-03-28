export default function findDOMSelectionTextByTag(domSelection, tagname) {
  let currentDom = domSelection.anchorNode;
  while (!(currentDom.parentNode.tagName === tagname.toUpperCase())) {
    currentDom = currentDom.parentNode;
  }

  return currentDom.textContent;
}
