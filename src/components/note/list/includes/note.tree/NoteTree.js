import React, { useState, useEffect } from 'react';
import './NoteTree.css';
import Node from '../node';

const NoteTree = ({ tree, dispatch }) => {
  const [UIState, setUIState] = useState({
    isClicked: null,
    isEditing: null,
    isShowingDesc: null,
  });
  return (
    <div className="note-tree">
      <ul>
        {tree.children.map((el) =>
          <Node
            dispatch={dispatch}
            item={el}
            key={el.id}
            UIState={UIState}
            setUIState={setUIState}
          />)}
      </ul>
    </div>
  )
};

export default NoteTree;
