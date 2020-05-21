import React, { useState } from 'react';
import { connect } from 'react-redux';
import to from 'await-to-js';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { tagActions, noteActions } from '../../../../../store/actions';
import './TagBlock.css';
// icons
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import RemoveIcon from '@material-ui/icons/Remove';

const TagBlock = ({
  // tag info
  title,
  isSelected,
  type,
  tagId,
  tagIndex,
  options,
  // tag states
  toDefaultState,
  toShowTagNotes,
  toEditTagState,
  toAddNoteToTagState,
  // redux logic with tag
  addTag,
  updateTag,
  removeTag,
  getTagNotes,
  selectTag,
  resetTag,
}) => {
  const [err, setErrStatus] = useState(null);
  const classes = cn({
    'col-md-3': true,
    'tag-block': true,
    'active': isSelected,
    'd-flex align-items-center justify-content-center': true,
    'tag-is-invalid': err,
    'flex-column': true,
  });
  const addNewTagClasses = cn({
    'col-md-3 tag-block add-tag': true,
    'tag-is-invalid': err,
  });
  const tagTitleClasses = cn({
    'col-12 text-center': !isSelected,
    'd-none': isSelected,
  });
  const { register, handleSubmit, watch } = useForm();

  const cancelButtonHadnler = () => {
    // toDefaultState();
    resetTag();
  };

  // redux logic handles
  const saveButtonHandler = async data => {
    const [err] = await to(addTag(data));
    if (err) {
      if (err.response.status === 409) {
        setErrStatus('Tag arleady exists');
      }
      throw err;
    }
    toDefaultState();
  };
  const updateTagHandler = async () => {
    const title = watch('title');
    console.log(title);
    const [err] = await to(updateTag(tagIndex, tagId ,{ title }));
    if (err) {
      if (err.response.status === 409) {
        setErrStatus('Tag arleady exists');
      }
      throw err;
    }
    selectTag(tagIndex);
    toShowTagNotes();
  };
  const removeTagHandler = async () => {
    const [err] = await to(removeTag(tagIndex, tagId));
    if (err) { 
      setErrStatus("Can't delete tag");
      throw err;
    }
  };
  const onClickBlockHandler = async () => {
    if (options.includes('showNotes')) {
      const [err] = await to(getTagNotes(tagId));
      if (err) {
        console.log(err);
        setErrStatus("Can't get tag notes :(. Refresh page and try again");
        throw err;
      }
      toShowTagNotes();
    }
    selectTag(tagIndex);

  };
  
  // ui logic
  const onCloseButtonHadnler = e => {
    e.stopPropagation();
    resetTag();
    cancelButtonHadnler();
  };
  const onUpdateButtonHandler = e => {
    e.stopPropagation();    
    toEditTagState();
  };
  const onDeleteButtonHandeler = async e => {
    e.stopPropagation();
    const conf = window.confirm(`Are you sure?`);
    if (conf) {
      await removeTagHandler();
      resetTag();
      toDefaultState();
    }
  };
  const openModalHandler = e => {
    e.stopPropagation();
    toAddNoteToTagState();
  };

  if (type === 'new') {
    return (
      <>
        <div className={addNewTagClasses}>
          <form action="" onSubmit={handleSubmit(saveButtonHandler)}>
            <div className="d-flex">
              <input type="text" name="title" id="add-title-input" ref={register} defaultValue="Новый тег" autoFocus />
              <button type="submit" className="btn btn-small btn-light"><SaveIcon /></button>
              <button type="button" className="btn btn-small btn-light" onClick={cancelButtonHadnler}><CancelIcon /></button>
            </div>
          </form>
          {err && <small className="invalid-msg">{err}</small>}
        </div>
      </>
    );
  };

  if (type === 'edit') {
    return (
      <>
        <div className={addNewTagClasses}>
          <form action="" onSubmit={handleSubmit(updateTagHandler)}>
            <div className="d-flex">
              <input type="text" name="title" id="add-title-input" ref={register} defaultValue={title} autoFocus />
              <button type="submit" className="btn btn-small btn-light"><SaveIcon /></button>
              <button type="button" className="btn btn-small btn-light" onClick={cancelButtonHadnler}><CancelIcon /></button>
            </div>
          </form>
          {err && <small className="invalid-msg">{err}</small>}
        </div>
      </>
    );
  }

  return (
    <div className={classes} onClick={onClickBlockHandler}>
      <div className="tag-container">
        <div className="row align-items-center justify-content-center">
          <div className={tagTitleClasses}>
            {title}
          </div>
          {isSelected && (
            <div className="col-12 close-icon d-flex">
              <button type="button" className="btn btn-small btn-light" id="tag-close" onClick={onCloseButtonHadnler}><CloseIcon /></button>
              {options.includes('addNote') && (
                <button
                  type="button"
                  className="btn btn-small btn-success"
                  onClick={openModalHandler}
                >
                  <NoteAddIcon />
                </button>
              )}
              {options.includes('delete') && (
                <button
                  type="button"
                  className="btn btn-small btn-primary"
                  onClick={onUpdateButtonHandler}>
                    <EditIcon />
                </button>)
              }              
              {options.includes('delete') && (
                <button
                  type="button"
                  className="btn btn-small btn-danger"
                  onClick={onDeleteButtonHandeler}>
                  <DeleteIcon />
                </button>)
              }
              {options.includes('removeFromNote') && (
                <button
                  type="button"
                  className="btn btn-small btn-danger"
                  onClick={onDeleteButtonHandeler}>
                  <RemoveIcon />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {err && <small className="invalid-msg">{err}</small>}
    </div>
  );
};

TagBlock.defaultProps = {
  type: 'show',
  options: ['edit', 'delete', 'addNote', 'showNotes'],
};


const mapStateToProps = state => {
  const { isLoading } = state;
  return {
    isLoading: isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  getTags: () => dispatch(tagActions.getTags()),
  getTagNotes: tagId => dispatch(noteActions.getTagNotes(tagId)),
  addTag: (data) => dispatch(tagActions.addTag(data)),
  updateTag: (tagIndex, tagId, data) => dispatch(tagActions.updateTag(tagIndex, tagId , data)),
  removeTag: (tagId, index) => dispatch(tagActions.removeTag(tagId, index)),
  selectTag: index => dispatch(tagActions.selectTag(index)),
  resetTag: () => dispatch(tagActions.resetSelectTag()),
});



export default connect(mapStateToProps, mapDispatchToProps)(TagBlock);
