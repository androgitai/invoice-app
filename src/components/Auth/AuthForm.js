import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';
import { loginUser, registerUser } from '../../store/auth-http-actions';

import classes from './AuthForm.module.css';
import Button from '../UI/Elements/Button';

const AuthForm = () => {
  const { isLogin, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    dispatch(authActions.toggleIsLogin());
  };

  const submitHandler = event => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassrord = passwordInputRef.current.value;

    //validation

    if (!isLogin) {
      dispatch(registerUser(enteredEmail, enteredPassrord));
    }
    if (isLogin) {
      dispatch(loginUser(enteredEmail, enteredPassrord));
      navigate('/invoices');
    }
  };

  return (
    <section className={classes.auth} key={isLogin}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <Button type='submit' btnType='primary' disabled={isLoading}>
            {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
          </Button>
          <Button
            disabled={isLoading}
            btnType='discard'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
