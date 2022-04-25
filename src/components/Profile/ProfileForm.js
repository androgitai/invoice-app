import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { changeUserPassword } from '../../store/auth-http-actions';

import classes from './ProfileForm.module.css';
import Button from '../UI/Elements/Button';

const ProfileForm = () => {
  const idToken = useSelector(state => state.auth.idToken);
  const dispatch = useDispatch();
  const newPasswordInputRef = useRef();
  const confirmNewPasswordInputRef = useRef();

  const passwordChangeSubitHandler = event => {
    event.preventDefault();
    const newPassword = newPasswordInputRef.current.value;
    const confirmNewPassword = confirmNewPasswordInputRef.current.value;
    dispatch(changeUserPassword(newPassword, confirmNewPassword));
  };

  return (
    <form className={classes.form} onSubmit={passwordChangeSubitHandler} key={idToken}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='confirm-new-password'>Confirm New Password</label>
        <input type='password' id='confirm-new-password' ref={confirmNewPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <Button btnType='primary' type='submit'>
          Change Password
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
