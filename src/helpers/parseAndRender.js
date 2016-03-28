import CommonMark from './commonmark.js/lib/';
import ReactRenderer from './commonmarkReactRenderer';

export default function parseAndRender(ast) {
  const parser = new CommonMark.Parser({preserveRaw: true});
  const markedAst = parser.parse(ast);
  const renderer = new ReactRenderer();
  const reactBlocksArr = renderer.render(markedAst);

  return reactBlocksArr;
}
