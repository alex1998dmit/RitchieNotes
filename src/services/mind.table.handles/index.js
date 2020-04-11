// warning !!!
const removeEmptyElementsFromTree = tree => {
  let newObj = {};
  const iter = node => {
    if (node.type === 'empty') {
        console.log(node);
        return false;
    }
    node.children = node.children.filter(el => iter(el));
    return node;
  }
  newObj = { ...iter(tree)};
  return newObj;
}

const countChildrenMaxElementsOnLevels = tree => {
  const iter = (n, currentDepth, acc) => {
    const { children } = n;
    acc[currentDepth + 1] = 0;
    acc[currentDepth + 1] = acc[currentDepth + 1] < children.length ? children.length : acc[currentDepth + 1];
    return children.reduce(
      (cAcc, nn) => iter(nn, currentDepth + 1, cAcc),
      acc
    );
  }
  return iter(tree, 0, [tree.children.length]);
}

const fromTreeToMatrix = tree => {
  const maxChildrenOnLevels = countChildrenMaxElementsOnLevels(tree);
  const iter = (n, currentDepth, acc) => {
    if (n && n.children.length < maxChildrenOnLevels[currentDepth + 1]) {
        const diff = maxChildrenOnLevels[currentDepth + 1] - n.children.length;
        for (let i = 0; i < diff;i++) {
            n.children = [...n.children, { id: 0, type: 'empty', children: [] }];
        }
    }
    acc[currentDepth] = acc[currentDepth] ? acc[currentDepth] : [];
    acc[currentDepth] = [...acc[currentDepth], n];
    return n.children.reduce(
      (cAcc, nn) => iter(nn, currentDepth + 1, cAcc),
      acc
    )
  }
  let matrix = iter(tree, 0, []);
  removeEmptyElementsFromTree(tree);
  return matrix;
};

export { fromTreeToMatrix };

