import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import { noteTreeActions } from '../../../store/actions';

const Dashboard = ({ user, getItems, items }) => {
  useEffect(() => {
    const asyncFunctions = async () => {
      await getItems();
    }
    asyncFunctions();
  }, [getItems]);
  return (<div className="dashboard">
    <div className="row">
      <div className="col-md-12">
        <h3 className="pb-3">Hello, {user.local.email} </h3>
      </div>
      <hr/>
      <div className="col-md-12">
        <h5 className="pb-3">Your last notes: </h5>
        <div className="note-tree-items">
          <div className="row">
            {items.map(({ _id, tree}) => (
              <div className="col-3" key={_id}>
                <div className="note-tree-block">
                  <div class="card">
                    <div className="color-block" />
                    <div class="card-body">
                      <h5 class="card-title">{tree.title}</h5>
                      <p class="card-text">{tree.description}</p>
                      <a href="#" class="btn btn-sm btn-success">Go somewhere</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>);
};

const mapStateToProps = state => {
  const { user } = state.auth;
  const { items } = state.noteTree;
  return {
    user,
    items,
  };
};

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(noteTreeActions.getUserItems()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

