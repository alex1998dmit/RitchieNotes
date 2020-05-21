import store from '../../store/';

const findMaxId = (tree) => {
  const iter = (node, acc = 1) => {
    const { children } = node;
    if (!children) {
      return acc;
    }
    acc = node.id > acc ? node.id : acc;
    return children.reduce((cAcc, el) => iter(el, cAcc), acc)
  }
  return iter(tree);
};

const updateNode = (nodeId, item, tree) => {
  let newObj = {};
  const iter = node => {
    if (node.id === nodeId) {
      return {
        ...node,
        ...item,
      };
    }
    node.children = node.children.map(el => iter(el));
    return node;
  };
  newObj = { ...iter(tree) };
  return newObj;
};

const addChildNode = (nodeId, item, tree) => {
  if (nodeId === tree.id) {
    return { ...tree, children: [...tree.children, item]}
  }
  const iter = node => {
    if (node.id === nodeId) {
        node.children = [...node.children, item];
        return node;
    }
    node.children = node.children.map((el) => iter(el));
    return node;
  };
  return iter(tree);
};

export {
  findMaxId,
  updateNode,
  addChildNode
};
