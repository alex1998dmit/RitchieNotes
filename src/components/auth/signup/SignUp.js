import React from 'react';
import to from 'await-to-js';
import { withRouter } from "react-router";
import './SignUp.css';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { authActions } from '../../../store/actions';

import Preloader from '../../utils/preloader';

const SignUp = ({ signUp, aboutUser, oauthGoogle, err, history, isLoading }) => {
  const { register, handleSubmit, errors } = useForm();
  const formHandler = async (data) => {
    const [e, token] = await to(signUp(data));
    if (e) {
      console.log(e);
      throw e;
    }
    const [errAboutUser] = await to(aboutUser(token));
    if (errAboutUser) {
      throw errAboutUser;
    }
    history.push('/myaccount');
  };

  return (
    <div className="sign-up-block">
      <div className="row">
        <div className="col-12 mb-1">
          <h2>Sign Up</h2>
          {/* {err && <div class="alert alert-danger" role="alert"> {err} </div>} */}
        </div>        
        <div className="col-md-6 sign-up-form">
          <p>Sign up system by default</p>
          <form action="" onSubmit={handleSubmit(formHandler)}>
            <div className="form-group">
              <label htmlFor="#email">Name</label>
              <input
                ref={register}
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Dennis Ritchey"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="#email">Email</label>
              <input
                ref={register}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="#password">Password</label>
              <input
                ref={register} 
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="your password"
                required
              />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="agreeWithTerms" />
              <label className="form-check-label" htmlFor="agreeWithTerms">
                I agree with a <a href="#some">terms</a>
              </label>
            </div>
            <div className="form-group">
              {isLoading ? <Preloader /> : <input type="submit" className="btn btn-primary" value="SignUp" />}
            </div>
          </form>
          <hr/>
        </div>
        <div className="col-md-6">
          
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  const { err, isLoading } = state.auth;
  return {
    err,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  signUp: data => dispatch(authActions.signUp(data)),
  aboutUser: token => dispatch(authActions.aboutUser(token)),
});

export default withRouter(compose(connect(mapStateToProps, mapDispatchToProps))(SignUp));
