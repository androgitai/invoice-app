import { useDispatch, useSelector } from 'react-redux';
import { updateInvoiceStatus } from '../../../store/invoices-http-actions';

import classes from './InvoiceDetailsControl.module.css';
import Button from '../../UI/Elements/Button';

const InvoiceDetailsControl = props => {
  const dispatch = useDispatch();
  const { currentInvoice, currentInvoiceId } = useSelector(state => state.invoices);

  const contolClasses = `${classes.controls} ${classes[props.position]}`;
  const isDraft = currentInvoice.status === 'draft';
  const isPending = currentInvoice.status === 'pending';

  const markAsPaidHandler = () => {
    dispatch(updateInvoiceStatus(currentInvoiceId));
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
        <Button btnType='primary' onClick={markAsPaidHandler}>
          Mark as Paid
        </Button>
      )}
    </div>
  );
};

export default InvoiceDetailsControl;
