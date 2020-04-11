import React from 'react';

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
  const [state, setState] = useState({
    isEditing: UIState.isEditing === el.id,
    isSelected: UIState.isSelected === el.id,
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
    setUIState(() => {
      return {
        ...UIState,
        isEditing: null,
      };
    });
  }

  const openModal = () => {
    dispatch(mindTableHorActions.setUIStatusToBlock(el.id, 'isSelected'));
    console.log();
  };

  if (el.type === 'empty') {
    return (
      <div className="table-row" style={styles}>
        <div className="item empty" />
      </div>
    );
  }

  if (state.isEditing) {
    return (
      <div className="table-row" style={styles} onClick={openModal} onMouseEnter={showButtons} onMouseLeave={hideButtons}>
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
};

export default TableBlock;
