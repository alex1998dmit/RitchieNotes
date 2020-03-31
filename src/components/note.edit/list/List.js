import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Node = ({ item }) => {
  const [nodeParams, setNode] = useState({
    isClicked: false,
    isEditing: false,
    isShowingDesc: false,
  });
  const handleClick = e => {
    console.log(item);
    setNode({ ...nodeParams, isClicked: true });
  };

  if (!item.children || item.children.length === 0) {
    return (
      <li
        onClick={handleClick}
        contentEditable={nodeParams.isClicked}
      >
        <div className="node-title">
          {item.title}
        </div>
        <div className="node-desc">
          <textarea className="form-control" name="" id="">{item.desc}</textarea>
        </div>        
        {/* <input type="text" value={item.title} /> */}
      </li>
    )
  } else {
    return (
      <li>
        {item.title}
        <ul>
          {item.children.map(el => <Node item={el} />)}
        </ul>
      </li>
    );
  }
}

const NoteTree = ({ tree }) => {
  return (
    <div className="note-tree">
      <ul>
        {tree.children.map((el) => <Node item={el} />)}
      </ul>
    </div>
  )
}

const Editor = () => {
  // const { register, setValue, }

  const initTree = {
    title: 'Название раздела',
    desc: 'Некоторое описание',
    children: [
      {
        id: 0,
        title: 'Раздел 1.1',
        desc: 'Некоторое описание 2',
        children: [
          { id: 1, title: 'Раздел 1.1.1', desc: null, children: [] },
          { id: 2, title: 'Раздел 1.1.2', desc: null, children: [] },
        ],
      },
      {
        id: 3,
        title: 'Раздел 1.2',
        desc: 'Некоторое описание 2',
        children: [],
      }
    ]
  };

  const [noteTree, setNoteTree] = useState(initTree);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          Редактор записи в формате списка
        </div>
      </div>
      <div className="col-md-12">
        {/* <ul contentEditable="true">
          
        </ul> */}
        <NoteTree tree={noteTree} />
      </div>
    </div>
  );
};

export default Editor;
