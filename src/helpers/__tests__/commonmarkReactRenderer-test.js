import {expect} from 'chai';
import CommonMark from 'commonmark';
import ReactRenderer from '../commonmarkReactRenderer';

describe('commonmarkReactRenderer', () => {
  const blocksCount = 3;
  const input = '# This is a header\n\n- And this is **a _amazing_** word\n\n```function()```';

  const parser = new CommonMark.Parser();
  const renderer = new ReactRenderer();

  const ast = parser.parse(input);
  // // Result of this operation will be an array of React elements
  const reactComponents = renderer.render(ast);

  it('should render array of React elements', () => {
    expect(reactComponents.length).to.equal(blocksCount);
  });
});
