const removeNodeFromTree = (nodeId, tree) => {
    const iter = (node) => {
      const { children } = node; 
      if (node.id !== nodeId) {      
        return children.filter(n => iter(n));
      }
    }
    return { ...tree, children: iter(tree) };
};

const findNodeById = (id, tree) => {
  let finded;
  const iter = node => {
      if (node.id === id) {
          finded = node;
      }      
      node.children.map((el) => iter(el));
  }
  iter(tree);
  return finded;
}

const addNode = (parentNodeId, item, tree) => {
  if (parentNodeId === tree.id) {
    return { ...tree, children: [...tree.children, item]}
  }
  const iter = node => {
      if (node.id === parentNodeId) {
          node.children = [...node.children, item];
          return node;
      }
      node.children = node.children.map((el) => iter(el));
      return node;
  }
  return iter(tree);
}

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

module.exports = {
  removeNodeFromTree,
  findNodeById,
  addNode,
  updateNode,
};
