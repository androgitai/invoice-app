import classes from './InvoiceFormItem.module.css';

const FormItem = props => {
  const today = [
    new Date().getFullYear(),
    (new Date().getMonth() + 1).toString().padStart(2, '0'),
    new Date().getDate().toString().padStart(2, '0'),
  ].join('-');

  let defVal;
  defVal = props.defVal;
  if (props.type === 'date') {
    defVal = props.defVal === '' ? today : props.defVal;
  }

  if (props.type === 'select') {
    defVal = props.defVal === 0 ? 30 : props.defVal;

    return (
      <label htmlFor='Payment Terms' className={classes.gridItem}>
        <p>Payment Terms</p>
        <select
          name='paymentTerms'
          id='paymentTerms'
          form='invoiceForm'
          defaultValue={defVal}
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
        placeholder={props.placeHold}
      />
    </label>
  );
};

export default FormItem;
