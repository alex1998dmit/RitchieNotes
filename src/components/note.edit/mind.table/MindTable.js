import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './MindMap.css';
import { connect } from 'react-redux';
import { findMaxId } from '../../../services/tree.handles';
import SingleItemModal from './components/modal.single';
import { mindTableHorActions, noteTreeActions } from '../../../store/actions';
import { useEffect } from 'react';

const TableBlock = ({
    el,
    table,
    rowIndex,
    setSelectedItem,
    UIState,
    setUIState,
    dispatch,
    register,
    handleSubmit,
  }) => {
  const [state] = useState({
    isEditing: UIState.isEditing === el.id,
  });

  const [isShowedButtons, setShowButtons] = useState(false);
  const showButtons = () => setShowButtons(true);
  const hideButtons = () => setShowButtons(false);

  const styles = {
    height: 100 / table[rowIndex].length + '%',
    widht: '20%',
  };
  const addButtonHandler = e => {
    e.preventDefault();
    e.stopPropagation();
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
    // dispatch(noteTreeActions.addChildNode(el.id, newEmptyNode));
  }
  const handleFormSubmit = (data, e) => {
    e.preventDefault();
    dispatch(noteTreeActions.addChildNode(el.id, { title: 'Введите название', description: '', children: [] } ));
    // dispatch(noteTreeActions.)
  }

  const openModal = () => dispatch(mindTableHorActions.setUISelectedBlock(el));

  if (el.type === 'empty') {
    return (
      <div className="table-row" style={styles}>
        <div className="item empty" />
      </div>
    );
  }

  if (state.isEditing) {
    return (
      <div className="table-row" style={styles}>
        <div className="item-active">
          <div className="title">
            <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="form-group">
                <input className="form-control" ref={register} type="text"/>
                <input type="submit" className="btn btn-success" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="table-row" style={styles} onClick={openModal} onMouseEnter={showButtons} onMouseLeave={hideButtons}>
        <div className="item active">
        {isShowedButtons && (
          <div className="quick-options">
            <button className="option" onClick={addButtonHandler}>+</button>
            <button className="option">-</button>
          </div>
        )}
          <div className="title">
            {el && <h5>{el.title}</h5>}
          </div>
        </div>
      </div>      
    </>
  );
}

const MindTable = ({ table, tableUIState, dispatch }) => {
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    dispatch(mindTableHorActions.fromTreeToTable());
  }, [dispatch]);

  const closeModal = () => dispatch(mindTableHorActions.resetUIStatuses());
  return (
    <div className="mind-table-block">
      {table.map((row, rowIndex) => {
        return (
          <div className="table-col" style={{
            height: 100 + '%',
          }}>
            {row.map((el, colIndex) => {
              return (
                <TableBlock
                  register={register}
                  handleSubmit={handleSubmit}
                  // setUIState={setUIState}
                  UIState={tableUIState}
                  dispatch={dispatch}
                  table={table}
                  el={el}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  // setSelectedItem={setSelectedItem}
                />);
              }
            )}
          </div>)
      })}    
      <SingleItemModal
        isOpened={tableUIState.isSelected.id > 0}
        el={tableUIState.isSelected}
        closeModal={closeModal}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { mindTableHorReducer } = state;
  return {
    table: mindTableHorReducer.table,
    tableUIState: mindTableHorReducer.tableUIState,
  };
};

export default connect(mapStateToProps)(MindTable);
