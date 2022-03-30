import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Elements/Button';
import Card from '../Layout/Card';
import Backdrop from './Backdrop';

const ModalOverlay = props => {
  return (
    <Card cardType='confirmModal'>
      <h2>Confirm Deletion</h2>
      <p>
        Are you sure you want to delete invoice #{props.invoiceId}? This action
        cannot be undone!
      </p>
      <div>
        <Button btnType='edit'>Cancel</Button>
        <Button btnType='delete'>Delete</Button>
      </div>
    </Card>
  );
};

const ConfirmModal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay invoiceId={props.invoiceId} />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default ConfirmModal;
