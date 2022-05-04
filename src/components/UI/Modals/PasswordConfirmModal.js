import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { changeUserPassword } from '../../../store/auth-http-actions';

import Button from '../Elements/Button';
import Card from '../Layout/Card';
import Backdrop from './Backdrop';

const ModalOverlay = props => {
  return (
    <Card cardType='confirmModal'>
      <h2>Change Password</h2>
      <p>Are you sure you want to change your password?</p>
      <div>
        <Button btnType='delete' onClick={props.onClose}>
          Cancel
        </Button>
        <Button btnType='primary' onClick={props.onChangePassword}>
          Confirm
        </Button>
      </div>
    </Card>
  );
};

const PasswordConfirmModal = props => {
  const dispatch = useDispatch();

  const changePasswordHandler = () => {
    dispatch(changeUserPassword(props.password, props.confirmPassword));
    dispatch(uiActions.hidePasswordModal());
  };
  const cancelChangeHandler = () => {
    dispatch(uiActions.hidePasswordModal());
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={cancelChangeHandler} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={cancelChangeHandler} onChangePassword={changePasswordHandler} />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default PasswordConfirmModal;
