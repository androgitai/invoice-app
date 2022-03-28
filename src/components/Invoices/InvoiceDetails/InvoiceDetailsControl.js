import classes from './InvoiceDetailsControl.module.css';
import Button from '../../UI/Elements/Button';

const InvoiceDetailsControl = () => {
  return (
    <div className={classes.controls}>
      <Button btnType='edit'>Edit</Button>
      <Button btnType='delete'>Delete</Button>
      <Button btnType='primary'>Mark as Paid</Button>
    </div>
  );
};

export default InvoiceDetailsControl;
