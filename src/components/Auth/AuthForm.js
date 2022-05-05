import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';
import { loginUser, registerUser } from '../../store/auth-http-actions';
import useForm from '../../hooks/use-form';
import { authLoginTemplate, authRegisterTemplate } from '../../lib/form-templates';

import classes from './AuthForm.module.css';
import Button from '../UI/Elements/Button';
import { useEffect } from 'react';

const AuthForm = () => {
  const { isLogin, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formState, formErrors, formValidity, dispatchFormChange, setIsSubmitting } = useForm(
    authLoginTemplate,
    { canBeEmpty: false, isInvoice: false }
  );

  useEffect(() => {
    if (isLogin) {
      dispatchFormChange({
        type: 'UPDATE_FORM_STATE',
        newFormState: authLoginTemplate,
        canBeEmpty: false,
        isInvoice: false,
      });
    }
    if (!isLogin) {
      dispatchFormChange({
        type: 'UPDATE_FORM_STATE',
        newFormState: authRegisterTemplate,
        canBeEmpty: false,
        isInvoice: false,
      });
    }
  }, [dispatchFormChange, isLogin]);

  const switchAuthModeHandler = () => {
    dispatch(authActions.toggleIsLogin());
  };

  const onInputChangeHandler = event => {
    const inputId = event.target.id;
    const inputValue = event.target.value;
    console.log(inputId, inputValue);
    dispatchFormChange({ type: 'UPDATE_FORM_INPUT', inputId, inputValue, isInvoice: false });
  };

  const submitHandler = event => {
    event.preventDefault();
    setIsSubmitting(true);
    if (!formValidity.isFormValid) {
      setTimeout(() => setIsSubmitting(false), 3000);
      return;
    }

    if (!isLogin) {
      dispatch(registerUser(formState.email, formState.password, formState.name));
    }
    if (isLogin) {
      dispatch(loginUser(formState.email, formState.password)).then(data => {
        if (!data) navigate('/invoices');
      });
    }
  };

  return (
    <section className={classes.auth} key={isLogin}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} noValidate>
        {!isLogin && (
          <fieldset className={`${classes.control} ${formErrors.name?.length && classes.error}`}>
            <label htmlFor='email'>
              <h3>Name</h3>
              <p>{formErrors.name?.[0]}</p>
              <input
                type='name'
                id='name'
                name='name'
                min='1'
                value={formState.name}
                onChange={onInputChangeHandler}
              />
            </label>
          </fieldset>
        )}
        <fieldset className={`${classes.control} ${formErrors.email?.length && classes.error}`}>
          <label htmlFor='email'>
            <h3>Your Email</h3>
            <p>{formErrors.email?.[0]}</p>
            <input
              type='email'
              id='email'
              name='email'
              value={formState.email}
              onChange={onInputChangeHandler}
            />
          </label>
        </fieldset>
        <fieldset className={`${classes.control} ${formErrors.password?.length && classes.error}`}>
          <label htmlFor='password'>
            <h3>Your Password</h3>
            <p>{formErrors.password?.[0]}</p>
            <input
              type='password'
              id='password'
              name='password'
              value={formState.password}
              onChange={onInputChangeHandler}
            />
          </label>
        </fieldset>
        <fieldset className={classes.actions}>
          <Button type='submit' btnType='primary' disabled={isLoading}>
            {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
          </Button>
          {isLogin && <h6>You don't have an account? Why not create one?</h6>}
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
