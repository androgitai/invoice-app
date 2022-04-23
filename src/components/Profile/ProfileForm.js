import classes from './ProfileForm.module.css';
import Button from '../UI/Elements/Button';

const ProfileForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <Button btnType='primary'>Change Password</Button>
      </div>
    </form>
  );
};

export default ProfileForm;
