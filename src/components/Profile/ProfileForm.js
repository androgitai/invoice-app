import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import useForm from '../../hooks/use-form';

import classes from './ProfileForm.module.css';
import Button from '../UI/Elements/Button';
import ProfileConfirmModal from '../UI/Modals/ProfileConfirmModal';

const ProfileForm = props => {
  const dispatch = useDispatch();
  const currentProfile = useSelector(state => state.profile);
  const showProfileDetailsConfirmModal = useSelector(
    state => state.ui.showProfileDetailsConfirmModal
  );
  console.log(currentProfile);
  const { formState, formErrors, formValidity, dispatchFormChange, setIsSubmitting } = useForm(
    currentProfile,
    { canBeEmpty: true, isInvoice: false }
  );

  const profileFormSubmitHandler = event => {
    event.preventDefault();
    setIsSubmitting(true);
    if (formValidity.isFormValid) {
      dispatch(uiActions.showProfileModal());
    }
    setTimeout(() => setIsSubmitting(false), 5000);
  };

  const onInputChangeHandler = event => {
    const inputId = event.target.id;
    const inputValue = event.target.value;
    console.log(inputId, inputValue);
    dispatchFormChange({ type: 'UPDATE_FORM_INPUT', inputId, inputValue, isInvoice: false });
  };

  useEffect(() => {
    dispatchFormChange({
      type: 'UPDATE_FORM_STATE',
      newFormState: currentProfile,
      canBeEmpty: true,
      isInvoice: false,
    });
    console.log('updating');
  }, [dispatchFormChange, currentProfile]);

  return (
    <form className={classes.profileText} onSubmit={profileFormSubmitHandler} noValidate>
      {showProfileDetailsConfirmModal && <ProfileConfirmModal profileData={formState} />}
      <label htmlFor='name' id='name' className={formErrors.name?.length && classes.error}>
        <h3>Name:</h3>
        <p>{formErrors.name?.[0]}</p>
        <input
          type='text'
          id='name'
          name='name'
          value={formState.name}
          onChange={onInputChangeHandler}
        />
      </label>
      <label htmlFor='phone' id='phone1' className={formErrors.phone1?.length && classes.error}>
        <h3>Phone:</h3>
        <p>{formErrors.phone1?.[0]}</p>
        <input
          type='text'
          id='phone1'
          name='phone1'
          value={formState.phone1}
          onChange={onInputChangeHandler}
        />
      </label>
      <label htmlFor='email' id='email' className={formErrors.email?.length && classes.error}>
        <h3>Email:</h3>
        <p>{formErrors.email?.[0]}</p>
        <input
          type='email'
          id='email'
          name='email'
          value={formState.email}
          onChange={onInputChangeHandler}
        />
      </label>
      <h3>Default Address:</h3>
      <label htmlFor='street' id='street' className={formErrors.street?.length && classes.error}>
        <h4>Street:</h4>
        <p>{formErrors.street?.[0]}</p>
        <input
          type='text'
          id='street'
          name='street'
          value={formState.street}
          onChange={onInputChangeHandler}
        />
      </label>
      <label htmlFor='city' id='city' className={formErrors.city?.length && classes.error}>
        <h4>City:</h4>
        <p>{formErrors.city?.[0]}</p>
        <input
          type='text'
          id='city'
          name='city'
          value={formState.city}
          onChange={onInputChangeHandler}
        />
      </label>
      <label
        htmlFor='postCode'
        id='postCode'
        className={formErrors.postCode?.length && classes.error}
      >
        <h4>Postcode:</h4>
        <p>{formErrors.postCode?.[0]}</p>
        <input
          type='text'
          id='postCode'
          name='postCode'
          value={formState.postCode}
          onChange={onInputChangeHandler}
        />
      </label>
      <label htmlFor='country' id='country' className={formErrors.country?.length && classes.error}>
        <h4>Country:</h4>
        <p>{formErrors.country?.[0]}</p>
        <input
          type='text'
          id='country'
          name='country'
          value={formState.country}
          onChange={onInputChangeHandler}
        />
      </label>
      <Button btnType='primary' type='submit'>
        Change Profile Details
      </Button>
    </form>
  );
};

export default ProfileForm;
