import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { noteTreeActions } from '../../../store/actions';
import { connect } from 'react-redux';
import cn from 'classnames';
import './List.css';
import { findMaxId } from '../../../services/tree.handles';

const Node = ({ item, dispatch, UIState, setUIState }) => {
  const node = useRef();
  const [params, setNode] = useState({
    isClicked: UIState.isClicked === item.id,
    isEditing: UIState.isEditing === item.id,
    isShowingDesc: UIState.isShowingDesc === item.id,
  });
  const { register, handleSubmit } = useForm();
  const listItemsClasses = cn({
    'list-item': true,
    'bordered': params.isClicked,
  });

  const outsideClick = useCallback((e) => {
    if (node.current.contains(e.target)) {
      return ;
    }
    resetNodeParams();
  }, []);

  const keyPressedHandler = useCallback((e) => {
    switch(e.keyCode) {
      // Esc pressed
      case 27:
        resetNodeParams();
        break;
      default:
        return ;
    }
  }, []);

  const handleClick = e => {    
    if (!params.isEditing) {
      setNode({ ...params, isShowingDesc: true, isClicked: true });
    }
  };
  const handleDoubleClick = e => {
    setNode({ ...params, isEditing: true, isShowingDesc: false });
  }
  const formHandler = (data, e) => {
    e.preventDefault();
    console.log(data);
    dispatch(noteTreeActions.updateNode(item.id, { ...item, title: data.title, description: data.desc }));
    resetNodeParams();
  };
  const addButtonHandler = e => {
    e.preventDefault();
    const newNodeId = findMaxId() + 1;
    const newEmptyNode = {
      id: newNodeId,
      title: 'Введеите название',
      description: 'Введите название',
      children: [],
    };
    setUIState(() => {
      return {
        ...UIState,
        isEditing: newNodeId,
      };
    });
    resetNodeParams();
    dispatch(noteTreeActions.addChildNode(item.id, newEmptyNode));
  }
  const removeButtonHandler = e => {
    e.preventDefault();
    // resetNodeParams();
    dispatch(noteTreeActions.removeNodeFromTree(item.id));
  }
  
  const resetNodeParams = () => {
    setNode(() => { return {
      isClicked: false,
      isEditing: false,
      isShowingDesc: false,
    }});
  };

  useEffect(() => {
    // for disable editing if clicked outside
    document.addEventListener("mousedown", outsideClick);
    // for disable editing if esc pressed
    document.addEventListener("keydown", keyPressedHandler, false);

    return () => {
      document.removeEventListener("mousedown", outsideClick);
      document.removeEventListener("keydown", keyPressedHandler, false);
    };
  }, [outsideClick, keyPressedHandler]);

  return (
    <div className="list-items" ref={node}>
      {!item.children || item.children.length === 0 ? (
        <li
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          className={listItemsClasses}
      >
        <div className="node-title">
          {params.isEditing ? (
            <>
              <form action="" onSubmit={handleSubmit(formHandler)}>
                <div className="form-group row align-items-end">
                  <div className="col-10">
                    <input name="title" className="input-title w-100" defaultValue={item.title} autoFocus ref={register} />
                  </div>
                  <div className="col-2 d-flex justify-content-between">
                    <button className="btn-option btn-about btn btn-success" onClick={handleSubmit(formHandler)}>save</button>
                    <button className="btn-option btn-add btn btn-warning" onClick={addButtonHandler}>+</button>
                    <button className="btn-option btn-remove btn btn-danger" onClick={removeButtonHandler}>-</button>
                  </div>
                </div>
                <div className="form-group">
                  <textarea className="form-control" name="desc" defaultValue={item.description} ref={register} />
                </div>
              </form>
            </>
          ) : item.title }
        </div>
        {params.isShowingDesc ? (
          <div className="node-desc">
            <textarea className="form-control" ref={register} name="description" id="" defaultValue={item.description} disabled />
        </div>        
        ) : null }
      </li>
      ) : (
        <li>
          {item.title}
          <ul>
            {item.children.map(el => <Node item={el} key={el.id} dispatch={dispatch} UIState={UIState} setUIState={setUIState} />)}
          </ul>
        </li>
      )}
    </div>
  );
}

const NoteTree = ({ tree, dispatch }) => {
  const [UIState, setUIState] = useState({
    isClicked: null,
    isEditing: null,
    isShowingDesc: null,
  });
  return (
    <div className="note-tree">
      <ul>
        {tree.children.map((el) => <Node item={el} key={el.id} dispatch={dispatch} UIState={UIState} setUIState={setUIState} />)}
      </ul>
    </div>
  )
}

const Editor = ({ tree, dispatch }) => {
  return (
    <div className="container">
      <div className="row list-editor-block">
        <div className="col-md-12">
          Редактор записи в формате списка
        </div>
      </div>
      <div className="col-md-12">
        <NoteTree
          tree={tree}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { noteTreeReducer } = state;
  return {
    tree: noteTreeReducer,
  };
};

export default connect(mapStateToProps)(Editor);
