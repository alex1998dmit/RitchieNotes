import store from '../../store/';

const findMaxId = () => {
  const tree = store.getState().noteTreeReducer;
  const iter = (node, acc = 1) => {
    const { children } = node;
    if (!children) {
      return acc;
    }
    acc = node.id > acc ? node.id : acc;
    return children.reduce((cAcc, el) => iter(el, cAcc), acc)
  }
  return iter(tree);
}



export { findMaxId };
