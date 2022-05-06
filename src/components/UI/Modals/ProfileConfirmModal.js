import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { updateProfile } from '../../../store/profile-http-actions';

import Button from '../Elements/Button';
import Card from '../Layout/Card';
import Backdrop from './Backdrop';

const ModalOverlay = props => {
  return (
    <Card cardType='confirmModal'>
      <h2>Change Profile Details</h2>
      <p>Are you sure you want to change your profile details?</p>
      <div>
        <Button btnType='delete' onClick={props.onClose}>
          Cancel
        </Button>
        <Button btnType='primary' onClick={props.onChangeDetails}>
          Confirm
        </Button>
      </div>
    </Card>
  );
};

const ProfileConfirmModal = props => {
  const dispatch = useDispatch();

  const changeProfileDetailsHandler = () => {
    dispatch(updateProfile(props.profileData));
    dispatch(uiActions.hideProfileModal());
  };
  const cancelChangeHandler = () => {
    dispatch(uiActions.hideProfileModal());
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={cancelChangeHandler} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={cancelChangeHandler}
          onChangeDetails={changeProfileDetailsHandler}
        />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default ProfileConfirmModal;
