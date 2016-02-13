import {expect} from 'chai';
import CommonMark from 'commonmark';
import ReactRenderer from '../commonmarkReactRenderer';

describe('commonmarkReactRenderer', () => {
  const parser = new CommonMark.Parser();
  const renderer = new ReactRenderer();
  it('should render array of React elements', () => {
    const blocksCount = 3;
    const input = '## This is a header\n\n- And this is **a _amazing_** word\n\n```function()```';

    const ast = parser.parse(input);
    const reactComponents = renderer.render(ast);
    expect(reactComponents.length).to.equal(blocksCount);
  });
});
