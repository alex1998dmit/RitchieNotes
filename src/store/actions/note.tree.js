import { noteTreeConstants } from '../constants';
import store from '../';

const updateNode = (nodeId, item) => {
  let newTree = {};
  const tree = store.getState().noteTreeReducer;
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

  newTree = { ...iter(tree) };
  return {
    type: noteTreeConstants.UPDATE_NOTE_TREE,
    newTree,
  }
};

const addChildNode = (nodeId, item) => {
  const tree = store.getState().noteTreeReducer;
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
  return {
    type: noteTreeConstants.UPDATE_NOTE_TREE,
    newTree: iter(tree),
  };
};

const removeNodeFromTree = (nodeId) => {
  const tree = store.getState().noteTreeReducer;
  let newTree = {};
  const iter = (node) => {
    const { children } = node;  
    if (node.id !== nodeId) {    
      return children.filter(n => iter(n));
    }
  }
  newTree = { ...tree, chidlren: iter(tree) };
  return {
    type: noteTreeConstants.UPDATE_NOTE_TREE,
    newTree,
  }
};

export default {
  updateNode,
  addChildNode,
  removeNodeFromTree
};
