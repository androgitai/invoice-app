import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { authActions } from '../../../store/auth-slice';
import { invoicesActions } from '../../../store/invoices-slice';
import { refreshUserToken } from '../../../store/auth-http-actions';
import { profileActions } from '../../../store/profile-slice';

import Button from '../Elements/Button';
import Card from '../Layout/Card';
import Backdrop from './Backdrop';

const ModalOverlay = props => {
  return (
    <Card cardType='confirmModal'>
      <h2>Confirm to stay Logged In</h2>
      <p>
        There is only 5 minutes left before you are going to be logged out automatically. Would you
        like stay logged in or logut immediately?
      </p>
      <div>
        <Button btnType='delete' onClick={props.onLogout}>
          Logout
        </Button>
        <Button btnType='primary' onClick={props.onStayLoggedIn}>
          Stay Logged In
        </Button>
      </div>
    </Card>
  );
};

const LogoutWarningModal = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stayLoggedInHandler = () => {
    dispatch(refreshUserToken());
    dispatch(uiActions.hideLogoutModal());
  };

  const logoutHandler = () => {
    dispatch(invoicesActions.resetInvoiceData());
    dispatch(profileActions.clearProfile());
    dispatch(authActions.logoutUser());
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Logout',
        message: `You have successfully logged out!`,
      })
    );
    dispatch(uiActions.hideLogoutModal());
    dispatch(uiActions.logoutWarnedFalse());
    navigate('/');
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(
        <ModalOverlay onLogout={logoutHandler} onStayLoggedIn={stayLoggedInHandler} />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default LogoutWarningModal;
