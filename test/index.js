import assert from 'assert';
import shallowCompareDecorator, { deepCompareDecorator } from '../src/';

describe('shallow compare decorator', () => {
  it('it should shallow compare in shouldComponentUpdate', done => {
    function Component() {};
    // Component.props = { value: 1 };
    // Component.prototype.shouldComponentUpdate = () => false;
    shallowCompareDecorator(Component);
    assert(Component.prototype.shouldComponentUpdate !== true, 'shouldComponentUpdate');
    done();
  });

  it('it should deep compare in shouldComponentUpdate', done => {
    function Component() {};
    // Component.props = { value: 1 };
    // Component.prototype.shouldComponentUpdate = () => false;
    deepCompareDecorator(Component);
    assert(Component.prototype.shouldComponentUpdate !== true, 'shouldComponentUpdate');
    done();
  });
});
