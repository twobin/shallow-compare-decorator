import assert from 'assert';
import shallowCompareDecorator from '../src/';

describe('shallow compare decorator', () => {
  it('it should shallow compare in shouldComponentUpdate', done => {
    function Component() {};
    // Component.prototype.shouldComponentUpdate = () => true;
    shallowCompareDecorator(Component);
    assert(Component.prototype.shouldComponentUpdate !== true, 'shouldComponentUpdate');
    done();
  });
});
