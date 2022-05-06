import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';

import Backdrop from './Backdrop';
import Auth from '../../Auth/Auth';

const AuthModal = props => {
  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(uiActions.toggleAuthModal());
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onModalClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(<Auth />, document.getElementById('overlay-root'))}
    </Fragment>
  );
};

export default AuthModal;
