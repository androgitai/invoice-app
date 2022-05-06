import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';
import { loginUser } from '../../store/auth-http-actions';
import { authLoginTemplate } from '../../lib/form-templates';
import { uiActions } from '../../store/ui-slice';
import useForm from '../../hooks/use-form';

import classes from './Auth.module.css';
import Button from '../UI/Elements/Button';

const Login = () => {
  const { isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formState, formErrors, formValidity, dispatchFormChange, setIsSubmitting } = useForm(
    authLoginTemplate,
    { canBeEmpty: false, isInvoice: false }
  );

  const switchAuthModeHandler = () => {
    dispatch(authActions.toggleIsLogin());
  };

  const onInputChangeHandler = event => {
    const inputId = event.target.id;
    const inputValue = event.target.value;
    dispatchFormChange({ type: 'UPDATE_FORM_INPUT', inputId, inputValue, isInvoice: false });
  };

  const submitHandler = event => {
    event.preventDefault();
    setIsSubmitting(true);
    if (!formValidity.isFormValid) {
      setTimeout(() => setIsSubmitting(false), 3000);
      return;
    }
    dispatch(loginUser(formState.email, formState.password)).then(data => {
      if (!data) {
        dispatch(uiActions.toggleAuthModal());
        navigate('/invoices');
      }
    });
  };

  return (
    <form onSubmit={submitHandler} noValidate>
      <fieldset className={formErrors.email?.length && classes.error}>
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
      <fieldset className={formErrors.password?.length && classes.error}>
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
      <fieldset>
        <Button type='submit' btnType='primary' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
        {<h6>You don't have an account? Why not create one?</h6>}
        <Button disabled={isLoading} btnType='discard' onClick={switchAuthModeHandler}>
          Create new account
        </Button>
      </fieldset>
    </form>
  );
};

export default Login;
