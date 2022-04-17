import { useDispatch } from 'react-redux';
import { invoicesActions } from '../../../store/invoices-slice';

import classes from './InvoiceDetailsControl.module.css';
import Button from '../../UI/Elements/Button';

const InvoiceDetailsControl = props => {
  const dispatch = useDispatch();

  const contolClasses = `${classes.controls} ${classes[props.position]}`;
  const isDraft = props.status === 'draft';
  const isPending = props.status === 'pending';

  const invoiceId = props.invoiceId;

  const markAsPaidHandler = invoiceId => {
    dispatch(invoicesActions.markAsPaid(invoiceId));
  };

  return (
    <div className={contolClasses}>
      {(isDraft || isPending) && (
        <Button btnType='edit' onClick={props.toggleForm}>
          Edit
        </Button>
      )}
      <Button btnType='delete' onClick={props.toggleModal}>
        Delete
      </Button>
      {isPending && (
        <Button btnType='primary' onClick={markAsPaidHandler.bind(null, invoiceId)}>
          Mark as Paid
        </Button>
      )}
    </div>
  );
};

export default InvoiceDetailsControl;
