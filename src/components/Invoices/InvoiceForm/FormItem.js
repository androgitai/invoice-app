import classes from './FormItem.module.css';

const FormItem = props => {
  if (props.type === 'select') {
    return (
      <label htmlFor='Payment Terms' className={classes.gridItem}>
        <p>Payment Terms</p>
        <select name='paymentTerms' id='paymentTerms' form='invoiceForm'>
          <option value={1}>Net 1 day</option>
          <option value={7}>Net 7 days</option>
          <option value={14}>Net 14 days</option>
          <option value={30}>Net 30 days</option>
        </select>
      </label>
    );
  }

  return (
    <label htmlFor={props.fieldName} className={classes.gridItem}>
      <p>{props.name}</p>
      <input type={props.type} disabled={props.disabled} />
    </label>
  );
};

export default FormItem;
