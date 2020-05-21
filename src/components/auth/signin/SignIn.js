import React, { useState } from 'react';
import to from 'await-to-js';
import { connect } from 'react-redux';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authActions } from '../../../store/actions';

const SignIn = ({
  // router
  history,
  // redux states
  isLoading,
  err,
  // dispatch
  signIn,
}) => {
  const { register, error, handleSubmit } = useForm();
  const [errorMSG, udpateErrorMsg] = useState(null);
  const inputClasses = cn({
    'form-control': true,
    'is-invalid': err,
  });
  const signInHandler = async data => {
    console.log(data);
    const [e, token] = await signIn(data);
    if (e) {
      switch (e.response.status) {
        case 401:
          udpateErrorMsg('Wrong user credentials');
          break;
        default:
          udpateErrorMsg('Server side problem, reload page and try again');
          break;
      }
    }
    
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <h2>SignIn</h2>
        {err && <h3>Wrong email or password, check credentials</h3>}
        <form action="" onSubmit={handleSubmit(signInHandler)}>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className={inputClasses}
              name="email"
              ref={register({ required: true })}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className={inputClasses}
              name="password"
              ref={register({ required: true })}
              required
              placeholder="your password"
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="SignIn" />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { err, isLoading } = state.auth;
  return {
    err,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  signIn: data => dispatch(authActions.signIn(data)),
  aboutUser: token => dispatch(),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
