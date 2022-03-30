import classes from './InvoiceDetailsControl.module.css';
import Button from '../../UI/Elements/Button';

const InvoiceDetailsControl = props => {
  const contolClasses = `${classes.controls} ${classes[props.visible]}`;
  console.log(contolClasses);

  return (
    <div className={contolClasses}>
      <Button btnType='edit'>Edit</Button>
      <Button btnType='delete'>Delete</Button>
      <Button btnType='primary'>Mark as Paid</Button>
    </div>
  );
};

export default InvoiceDetailsControl;
