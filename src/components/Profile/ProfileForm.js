import classes from './ProfileForm.module.css';
import Button from '../UI/Elements/Button';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { updateProfile } from '../../store/profile-http-actions';

const Profile = props => {
  const dispatch = useDispatch();

  const showConfirmModalHandler = event => {
    // dispatch(uiActions.toggleProfileModal());
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    dispatch(updateProfile(data));
  };

  return (
    <form className={classes.profileText} onSubmit={showConfirmModalHandler}>
      <label htmlFor='name' id='name'>
        Name:
      </label>
      <input type='text' id='name' name='name' defaultValue={props.profileData.name} />
      <label htmlFor='phone' id='phone1'>
        Phone:
      </label>
      <input type='text' id='phone1' name='phone1' defaultValue={props.profileData.phone1} />
      <label htmlFor='email' id='email'>
        Email:
      </label>
      <input type='email' id='email' name='email' defaultValue={props.profileData.email} />
      <label htmlFor='address' id='address'>
        Default Address:
      </label>
      <input
        type='text'
        id='address.street'
        name='street'
        defaultValue={props.profileData.street}
      />
      <input type='text' id='address.city' name='city' defaultValue={props.profileData.city} />
      <input
        type='text'
        id='address.postCode'
        name='postCode'
        defaultValue={props.profileData.postCode}
      />
      <input
        type='text'
        id='address.country'
        name='country'
        defaultValue={props.profileData.country}
      />
      <Button btnType='primary' type='submit'>
        Change Profile Details
      </Button>
    </form>
  );
};

export default Profile;
