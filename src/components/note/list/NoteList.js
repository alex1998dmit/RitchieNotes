import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { noteActions, tagActions } from '../../../store/actions';
import Preloader from '../../utils/preloader';
import './NoteList.css';
import NoteTree from './includes/note.tree';
// icons
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TableChartIcon from '@material-ui/icons/TableChart';
import CodeIcon from '@material-ui/icons/Code';
import TagBlock from '../../auth/dashboard/includes/tag.block';

const NoteList = ({ note, dispatch, getNote, getNoteTags, isLoading, tagItems, selectedTag }) => {
  const { id } = useParams();
  // const [tagState, setTagState] = useState('default');
  // const toDefaultState = () => setTagState('default');
  // const toEditTagState = () => setTagState('editTag');

  useEffect(() => {
    const asyncFunctions = async () => {
      await getNote(id);
      await getNoteTags(id);
    };
    asyncFunctions();
  }, [getNote, getNoteTags, id]);
  // conse
  if (isLoading) {
    return (
      <div className="is-loading-block" style={{
        height: '100vh',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Preloader />
      </div>
    )
  }
  const { tree } = note;
  return (
    <div className="note-list-block">
      <div className="row list-editor-block">
        <div className="col-6">
          <button className="btn btn-sm btn-primary">
            <FormatListBulletedIcon />
          </button>
          <button className="btn btn-small btn-light">
            <TableChartIcon />
          </button>
          <button className="btn btn-small btn-light">
            <CodeIcon />
          </button>
        </div>
        <div className="col-6 d-flex justify-content-end">
          {tagItems.map(({ title, _id }, index) => (
            <TagBlock 
              title={title}
              type="show"
              tagId={_id}
              isSelected={selectedTag._id === _id}
              tagIndex={index}
              options={['removeFromNote']}
              // toDefaultState={toDefaultState}
              // toEditTagState={toEditTagState}
            />
          ))}
        </div>
      </div>
      <hr/>
      <div className="col-md-12">
        <NoteTree
          tree={tree}
          dispatch={dispatch}
        />
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  const { selected, isLoading } = state.note;
  const { items } = state.tag;
  return {
    note: selected,
    isLoading,
    tagItems: items,
    selectedTag: state.tag.selected,
  };
};

const mapDispatchToProps = dispatch => ({
  getNote: noteId =>  dispatch(noteActions.getItem(noteId)),
  getNoteTags: noteId => dispatch(tagActions.getItemsByNote(noteId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
