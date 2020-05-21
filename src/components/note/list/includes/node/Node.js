import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { noteActions } from '../../../../../store/actions';
import { findMaxId } from '../../../../../services/tree.handles';
import './Node.css';
// icons
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

const NodeBase = ({ item , fullScreenHandler }) => {
  return (
    <div className="note-title">
       <div className="form-group row align-items-end">
         <div className="col-10">
          {item.title}
         </div>
        <div className="col-2 d-flex justify-content-end">
          <button
            className="btn-option btn-about btn btn-light"
            onClick={fullScreenHandler}
          >
            <FullscreenIcon />
          </button>
        </div>
       </div>
    </div>
  );
};

const NodeDesc = ({
  item,
  fullScreenHandler,
}) => {
  return (
    <>
      <div className="form-group row align-items-end">
        <div className="col-10">
          {item.title}
        </div>
        <div className="col-2 d-flex justify-content-end">
          <button className="btn-option btn-about btn btn-light" onClick={fullScreenHandler}><FullscreenIcon /></button>
        </div>
      </div>
      <div className="form-group">
        <textarea className="form-control" name="desc" defaultValue={item.description} disabled />
      </div>
    </>
  );
};

const NodeEdit = ({
  register,
  item,
  handleSubmit,
  formHandler,
  fullScreenHandler,
  addButtonHandler,
  removeButtonHandler
}) => {
  return (
    <form action="" onSubmit={handleSubmit(formHandler)}>
      <div className="form-group row align-items-end">
        <div className="col-10">
          <input name="title" className="input-title w-100" defaultValue={item.title} autoFocus ref={register} />
        </div>
        <div className="col-2 d-flex justify-content-between">
          <button className="btn-option btn-about btn btn-success" onClick={handleSubmit(formHandler)}><SaveIcon /></button>
          <button className="btn-option btn-add btn btn-primary" onClick={addButtonHandler}><AddIcon /></button>
          <button className="btn-option btn-remove btn btn-danger" onClick={removeButtonHandler}><RemoveIcon /></button>
        </div>
      </div>
      <div className="form-group">
        <textarea className="form-control" name="desc" defaultValue={item.description} ref={register} />
      </div>
    </form>
  );
};

const Node = ({
  selectedNote,
  err,
  isLoading,
  item,
  dispatch,
  UIState,
  setUIState,
  activeState,
  updateNode,
  addChildNode,
}) => {
  const node = useRef();
  const [params, setNode] = useState({
    Base: true,
    isEditing: UIState.isEditing === item.id,
    isShowingDesc: UIState.isShowingDesc === item.id,
  });
  // const [inputState, ]
  const { register, handleSubmit, watch } = useForm();
  const listItemsClasses = cn({
    'list-item': true,
    'bordered': params.isClicked,
  });

  const outsideClick = useCallback((e) => {
    if (node.current.contains(e.target)) {
      return ;
    }
    const title = watch('title');
    const desc = watch('desc');
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
      setNode({ ...params, isShowingDesc: true, Base: false });
    }
  };
  const handleDoubleClick = e => {
    setNode({ ...params, isEditing: true, isShowingDesc: false, Base: false });
  }
  const formHandler = (data, e) => {
    e.preventDefault();
    console.log(updateNode);
    updateNode(
      selectedNote,
      item.id,
      { title: data.title, description: data.desc },
    );
    resetNodeParams();
  };
  const addButtonHandler = e => {
    e.preventDefault();
    const newNodeId = findMaxId(selectedNote.tree) + 1;
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
        Base: false,
      };
    });
    addChildNode(selectedNote, item.id, newEmptyNode);
    resetNodeParams();
  }
  const removeButtonHandler = e => {
    e.preventDefault();
    // resetNodeParams();
    // dispatch(noteTreeActions.removeNodeFromTree(item.id));
  }
  const fullScreenHandler = e => {
    // e.preventDefault();
  }
  
  const resetNodeParams = () => {
    setNode(() => { return {
      isClicked: false,
      isEditing: false,
      isShowingDesc: false,
      Base: true,
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

  if (!item.children || item.children.length === 0 ) {
    return (
      <div className="node-list-note list-items" ref={node}>
        <li
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          className={listItemsClasses}
          >
        <div className="node-title">
          {params.isShowingDesc && 
            <NodeDesc
              item={item}
              fullScreenHandler={fullScreenHandler}
            />
          }
          {params.isEditing &&
            <NodeEdit
              register={register}
              item={item}
              handleSubmit={handleSubmit}
              formHandler={formHandler}
              fullScreenHandler={fullScreenHandler}
              addButtonHandler={addButtonHandler}
              removeButtonHandler={removeButtonHandler}
            />}
          {params.Base && 
            <NodeBase
              item={item}
              fullScreenHandler={fullScreenHandler}
            />
          }
        </div>
      </li>
    </div>
    );
  };

  return (
    <div className="node-list-note list-items" ref={node}>
      <li>
        {item.title}
        <ul>
          {item.children.map(el => 
            <Node
              item={el}
              key={el.id}
              dispatch={dispatch}
              UIState={UIState}
              setUIState={setUIState}
            />)}
        </ul>
      </li>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { selected, err, isLoading } = state.note;
  return {
    selectedNote: selected,
    err,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  updateNode: (noteId, nodeId, node, tree) => dispatch(noteActions.updateItem(noteId, nodeId, node, tree)),
  addChildNode: (note, nodeId, node) => dispatch(noteActions.addNodeChild(note, nodeId, node)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Node);
