import invariant from 'invariant';

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
};

function shouldShallowCompareComponentUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) ||
         !shallowEqual(this.state, nextState);
};

export default function shallowCompareDecorator(Component) {
  const componentName = Component.displayName || Component.name || 'component';

  invariant(Component.prototype !== undefined,
    `${componentName} does not have a prototype！`);

  invariant(Component.prototype.shouldComponentUpdate === undefined,
    `${componentName} already has shouldComponentUpdate！`);

  Component.prototype.shouldComponentUpdate = shouldShallowCompareComponentUpdate;
};
