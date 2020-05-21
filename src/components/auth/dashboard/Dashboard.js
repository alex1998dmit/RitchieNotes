import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import './Dashboard.css';
import { noteTreeActions, tagActions, noteActions } from '../../../store/actions';
import Preloader from '../../utils/preloader';
import TagBlock from './includes/tag.block';
import { Modal as AddNoteToTagModal } from '@material-ui/core';

const Dashboard = ({
  history,
  user,
  getUserNotes,
  getTags,
  getTagNotes,
  notesItems,
  tagItems,
  addTag,
  isLoading,
  selectedTag,
}) => {
  const [state, setState] = useState('default');
  const toAddTagState = () => setState('addTag');
  const toDefaultState = () => setState('default');
  const toShowTagNotes = () => setState('showTagNotes');
  const toEditTagState = () => setState('editTag');
  const toAddNoteToTagState = () => setState('addNoteTag');

  const { register, watch, handleSubmit } = useState();

  useEffect(() => {
    const asyncFunctions = async () => {
      await getUserNotes();
      await getTags();
    }
    asyncFunctions();
  }, [getUserNotes, getTags]);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="row">
          <div className="col-md-12">
            <Preloader />
            {/* <h5> ... Please wait :D </h5> */}
          </div>
        </div>
      </div>
    )
  }

  const whatIsTagBlockType = (tagId) => {
    if (selectedTag._id !== tagId) {
      return 'show';
    }
    switch (state) {
      case 'addNoteTag':
        return 'addNote';
      case 'editTag':
        return 'edit'
      default:
        return 'show';
    }
  }

  const handleNoteBlockClick = (noteId) => {
    console.log(noteId);
    history.push(`/notes/${noteId}/list`);
  }

  return (<div className="dashboard">
    <div className="row">
      <div className="col-12 tags-block">
          <div className="col-md-12">
            {state === 'default' ? <h5 className="title">Your tags</h5> : <h5 className="title">Selected tag: <b>{selectedTag.title}</b></h5> }
          </div>
        <div className="row">
          {state !== 'addTag' && <div className="col-md-3 d-flex align-items-center justify-content-center add-tag-button" onClick={toAddTagState}>+</div>}
          {state === 'addTag' && <TagBlock type="new" addTag={addTag} toDefaultState={toDefaultState} />}
          {tagItems.map(({ title, _id }, index) => 
            <TagBlock
              title={title}
              type={whatIsTagBlockType(_id)}
              toDefaultState={toDefaultState}
              toShowTagNotes={toShowTagNotes}
              toEditTagState={toEditTagState}
              toAddNoteToTagState={toAddNoteToTagState}
              tagId={_id}
              isSelected={selectedTag._id === _id}
              tagIndex={index}
            />)}
        </div>
      </div>
      {/* <div className="col-2">
        <div className="img-ava" style={{
          backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/2/23/Dennis_Ritchie_2011.jpg)`,
          height: '150px',
          width: '150px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          borderRadius: '50%',
        }}/>
        {/* {user.local.email} */}
      {/* </div> */}
      <hr/>
      <div className="col-md-12">
        {state === 'default' ? <h5>Your last notes</h5> : <h5>Notes taged by <b>{selectedTag.title}</b></h5> }
        <div className="notes-block row">
          <div className="col-3">
            <div className="note-add">
              <div className="header" />
              <div className="body text-center">
                <h2>+</h2>
              </div>
              <div className="footer" />
            </div>
          </div>
          {notesItems.length === 0 && (
            <div className="col-9 d-flex align-items-center dont-have-notes-sign">
              <h5 className="text-primary">It's sems like you dont have any notes, click at plus to create awesome one :D </h5>
            </div>
          )}
          {notesItems.map(({ _id, tree, createdAt}) => (
            <div className="col-3">
              <div className="note" onClick={() => handleNoteBlockClick(_id)}>
                <div className="header">
                  <div className="color-icon" />
                  <div className="title">{tree.title}</div>
                </div>
                <div className="body">
                  <div className="desc">
                    {tree.description}
                  </div>
                </div>
                <div className="footer">
                  <div className="col-12">
                    {createdAt}
                  </div>
                </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
    {/* <AddNoteToTagModal
      open={addNoteModalStatus}
      onClose={closeAddNoteModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{
          'min-height': '100vh',
        }}>
          <div className="col-8" style={{
            backgroundColor: 'white',
            height: '50%',
          }}>
            <div class="form-group">
              <input type="text" className="form-control" onChange={handleInputChange} placeholder="Your note title" />
            </div>
          </div>
        </div>
      </div>
    </AddNoteToTagModal> */}
  </div>);
};

const mapStateToProps = state => {
  const { user } = state.auth;
  const { tag, isLoading, note } = state;
  return {
    user,
    notesItems: note.items,
    tagItems: tag.items,
    isLoading: isLoading,
    selectedTag: tag.selected,
  };
};

const mapDispatchToProps = dispatch => ({
  getUserNotes: () => dispatch(noteActions.getUserItems()),
  getTags: () => dispatch(tagActions.getTags()),
  getTagNotes: tagId => dispatch(tagActions.getNotes(tagId)),
  addTag: (data) => dispatch(tagActions.addTag(data)),
});


connect(mapStateToProps, mapDispatchToProps)(TagBlock);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

