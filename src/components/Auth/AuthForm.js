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
  const nameInputRef = useRef();

  const switchAuthModeHandler = () => {
    dispatch(authActions.toggleIsLogin());
  };

  const submitHandler = event => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassrord = passwordInputRef.current.value;

    //validation

    if (!isLogin) {
      const enteredName = nameInputRef.current.value;
      dispatch(registerUser(enteredEmail, enteredPassrord, enteredName));
    }
    if (isLogin) {
      dispatch(loginUser(enteredEmail, enteredPassrord)).then(data => {
        if (!data) navigate('/invoices');
      });
    }
  };

  return (
    <section className={classes.auth} key={isLogin}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <fieldset className={classes.control}>
            <label htmlFor='email'>Name</label>
            <input type='name' id='name' name='name' min='1' ref={nameInputRef} />
          </fieldset>
        )}
        <fieldset className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' name='email' min='6' ref={emailInputRef} />
        </fieldset>
        <fieldset className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' name='password' min='6' ref={passwordInputRef} />
        </fieldset>
        <fieldset className={classes.actions}>
          <Button type='submit' btnType='primary' disabled={isLoading}>
            {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
          </Button>
          {isLogin && <p>You don't have an account? Why not create one?</p>}
          <Button
            disabled={isLoading}
            btnType='discard'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </Button>
        </fieldset>
      </form>
    </section>
  );
};

export default AuthForm;
