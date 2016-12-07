import invariant from 'invariant';

const maxDep = 5; // 最大深度
const hasOwnProperty = Object.prototype.hasOwnProperty;

// shallowCompareDecorator
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const bHasOwnProperty = hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldShallowCompareComponentUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) ||
         !shallowEqual(this.state, nextState);
}

export default function shallowCompareDecorator(Component) {
  const componentName = Component.displayName || Component.name || 'component';

  invariant(Component.prototype !== undefined,
    `${componentName} does not have a prototype！`);

  invariant(Component.prototype.shouldComponentUpdate === undefined,
    `${componentName} already has shouldComponentUpdate！`);

  Component.prototype.shouldComponentUpdate = shouldShallowCompareComponentUpdate;
};

// deepCompareDecorator
function deepEqual(objA, objB, depth) {
  if (depth > maxDep) {
    return false;
  }

  ++depth;

  if (objA === null || objB === null) {
    return false;
  }

  if (typeof objA === 'string' || typeof objA === 'number' || typeof objA === 'boolean') {
    if (objA !== objB) {
      return false;
    }
  }

  if (typeof objA === 'function') {
    if (!objA.hasOwnProperty('name') || !objB.hasOwnProperty('name') || valA.name !== valB.name) {
      return false;
    }
  }

  if (typeof objA === 'object' || typeof objA === 'array') {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (let i = 0; i < keysA.length; i++) {
      const bHasOwnProperty = hasOwnProperty.bind(objB);

      if (!bHasOwnProperty(keysA[i])) {
        return false;
      }

      if (!deepEqual(objA[keysA[i]], objB[keysB[i]], depth)) {
        return false;
      }
    }
  }

  if (objA !== objB) {
    return false;
  }

  return true;
}

function shouldDeepCompareComponentUpdate(nextProps, nextState) {
  return !deepEqual(this.props, nextProps, 1) || !deepEqual(this.state, nextState, 1);
}

export function deepCompareDecorator(Component) {
  const componentName = Component.displayName || Component.name || 'component';

  invariant(Component.prototype !== undefined,
    `${componentName} does not have a prototype！`);

  invariant(Component.prototype.shouldComponentUpdate === undefined,
    `${componentName} already has shouldComponentUpdate！`);

  Component.prototype.shouldComponentUpdate = shouldDeepCompareComponentUpdate;
};
