import { useDispatch, useSelector } from 'react-redux';
import { changeUserPassword } from '../../store/auth-http-actions';

import classes from './PasswordForm.module.css';
import Button from '../UI/Elements/Button';
import PasswordConfirmModal from '../UI/Modals/PasswordConfirmModal';
import { useState } from 'react';
import { uiActions } from '../../store/ui-slice';

const PasswordForm = () => {
  const idToken = useSelector(state => state.auth.idToken);
  const showPasswordDetailsConfirmModal = useSelector(
    state => state.ui.showPasswordDetailsConfirmModal
  );
  const dispatch = useDispatch();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const passwordInputChangeHandler = event => {
    setEnteredPassword(event.target.value);
  };
  const confirmPasswordInputChangeHandler = event => {
    setEnteredConfirmPassword(event.target.value);
  };

  const passwordChangeSubitHandler = event => {
    event.preventDefault();

    if (enteredPassword.length < 6 || !/^[a-zA-Z0-9]*$/.test(enteredPassword)) {
      console.log(enteredPassword.length);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message:
            'Invalid new password, it can only contain numbers and letters and has to at least 6 characters long',
        })
      );
      return;
    }
    dispatch(uiActions.showPasswordModal());
  };

  return (
    <form className={classes.form} onSubmit={passwordChangeSubitHandler} key={idToken}>
      {showPasswordDetailsConfirmModal && (
        <PasswordConfirmModal password={enteredPassword} confirmPassword={enteredConfirmPassword} />
      )}
      <label htmlFor='new-password'>New Password</label>
      <input
        type='password'
        id='new-password'
        min='6'
        placeholder='New password'
        value={enteredPassword}
        onChange={passwordInputChangeHandler}
      />
      <label htmlFor='confirm-new-password'>Confirm New Password</label>
      <input
        type='password'
        id='confirm-new-password'
        min='6'
        placeholder='Confirm new password'
        value={enteredConfirmPassword}
        onChange={confirmPasswordInputChangeHandler}
      />
      <Button btnType='primary' type='submit'>
        Change Password
      </Button>
    </form>
  );
};

export default PasswordForm;
