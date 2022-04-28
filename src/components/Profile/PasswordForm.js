import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { changeUserPassword } from '../../store/auth-http-actions';

import classes from './PasswordForm.module.css';
import Button from '../UI/Elements/Button';

const PasswordForm = () => {
  const idToken = useSelector(state => state.auth.idToken);
  const dispatch = useDispatch();
  const newPasswordInputRef = useRef();
  const confirmNewPasswordInputRef = useRef();

  const passwordChangeSubitHandler = event => {
    event.preventDefault();
    const newPassword = newPasswordInputRef.current.value;
    const confirmNewPassword = confirmNewPasswordInputRef.current.value;
    //validation missing
    dispatch(changeUserPassword(newPassword, confirmNewPassword));
  };

  return (
    <form className={classes.form} onSubmit={passwordChangeSubitHandler} key={idToken}>
      <label htmlFor='new-password'>New Password</label>
      <input
        type='password'
        id='new-password'
        min='6'
        placeholder='New password'
        ref={newPasswordInputRef}
      />
      <label htmlFor='confirm-new-password'>Confirm New Password</label>
      <input
        type='password'
        id='confirm-new-password'
        min='6'
        placeholder='Confirm new password'
        ref={confirmNewPasswordInputRef}
      />
      <Button btnType='primary' type='submit'>
        Change Password
      </Button>
    </form>
  );
};

export default PasswordForm;
