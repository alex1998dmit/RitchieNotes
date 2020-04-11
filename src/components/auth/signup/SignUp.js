import React from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css';

export default () => {
  const { register, handleSubmit } = useForm();
  const formHandler = data => {
    console.log(data);
  };
  return (
    <div className="sign-up-block">
      <div className="row">
        <div className="col-12 mb-1">
          <h2>Sign Up</h2>
        </div>        
        <div className="col-md-6 sign-up-form">
          <p>Sign up system by default</p>
          <form action="" onSubmit={handleSubmit(formHandler)}>
            <div className="form-group">
              <label htmlFor="#email">Email</label>
              <input
                ref={register}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="example@gmail.com"
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
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="SignUp" />
            </div>
          </form>
          <hr/>
          <div className="oauth-buttons">
            <button className="btn btn-default">Sign Up with Gmail</button>
            <button className="btn btn-default">Sign Up with Facebook</button>
          </div>          
        </div>
        <div className="col-md-6">
          
        </div>
      </div>
    </div>
  )
}