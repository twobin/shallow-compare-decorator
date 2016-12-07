# shallow-compare-decorator

shallowCompareDecorator and deepCompareDecorator

[![npm version](https://badge.fury.io/js/shallow-compare-decorator.png)](https://badge.fury.io/js/shallow-compare-decorator)
[![build status](https://travis-ci.org/twobin/shallow-compare-decorator.svg)](https://travis-ci.org/twobin/shallow-compare-decorator)
[![npm downloads](https://img.shields.io/npm/dt/shallow-compare-decorator.svg?style=flat-square)](https://www.npmjs.com/package/shallow-compare-decorator)

## usage

```
$ npm i -S shallow-compare-decorator
```

## docs

### shallowCompareDecorator

```
import shallowCompareDecorator from 'shallow-compare-decorator';

@shallowCompareDecorator
export default class Selector extends Component {
  render() { }
}
```

### deepCompareDecorator

```
import { deepCompareDecorator } from 'shallow-compare-decorator';

@deepCompareDecorator
export default class Selector extends Component {
  render() { }
}
```
