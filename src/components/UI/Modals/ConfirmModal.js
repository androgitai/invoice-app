import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { invoicesActions } from '../../../store/invoices-slice';

import Button from '../Elements/Button';
import Card from '../Layout/Card';
import Backdrop from './Backdrop';

const ModalOverlay = props => {
  return (
    <Card cardType='confirmModal'>
      <h2>Confirm Deletion</h2>
      <p>
        Are you sure you want to delete invoice #{props.invoiceId}? This action cannot be undone!
      </p>
      <div>
        <Button btnType='edit' onClick={props.onClose}>
          Cancel
        </Button>
        <Button btnType='delete' onClick={props.onDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

const ConfirmModal = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoiceId = props.invoiceId;

  const deleteInvoiceHandler = invoiceId => {
    dispatch(invoicesActions.deleteInvoice(invoiceId));
    navigate('/invoices');
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} onClose={props.onClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          invoiceId={props.invoiceId}
          onClose={props.onClose}
          onDelete={deleteInvoiceHandler.bind(null, invoiceId)}
        />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default ConfirmModal;
