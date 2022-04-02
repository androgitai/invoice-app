import classes from './InvoiceFormItem.module.css';

const FormItem = props => {
  const today = [
    new Date().getFullYear(),
    (new Date().getMonth() + 1).toString().padStart(2, '0'),
    new Date().getDate().toString().padStart(2, '0'),
  ].join('-');

  const defVal = props.type === 'date' ? today : '';

  if (props.type === 'select') {
    return (
      <label htmlFor='Payment Terms' className={classes.gridItem}>
        <p>Payment Terms</p>
        <select
          name='paymentTerms'
          id='paymentTerms'
          form='invoiceForm'
          defaultValue={30}
        >
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
      <input
        type={props.type}
        disabled={props.disabled}
        required={false}
        defaultValue={defVal}
        placeholder={props.defVal}
      />
    </label>
  );
};

export default FormItem;
