import classes from './InvoiceFormItem.module.css';

const FormItem = props => {
  const itemClasses = `${classes.gridItem} ${classes[props.gridArea]}`;

  const todaysDate = [
    new Date().getFullYear(),
    (new Date().getMonth() + 1).toString().padStart(2, '0'),
    new Date().getDate().toString().padStart(2, '0'),
  ].join('-');

  let defVal;
  defVal = props.defVal;
  if (props.type === 'date') {
    defVal = props.defVal === '' ? todaysDate : props.defVal;
  }

  if (props.type === 'select') {
    defVal = props.defVal === 0 ? 30 : props.defVal;

    return (
      <label htmlFor='Payment Terms' className={itemClasses}>
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

  if (props.type === 'price') {
    return (
      <label htmlFor={props.fieldName} className={itemClasses}>
        <p>{props.name}</p>
        <div className={classes.pricebox}>
          <span>£</span>
          <input
            className={classes.price}
            type={props.type}
            disabled={props.disabled}
            required={false}
            defaultValue={defVal.toFixed(2)}
            placeholder={props.placeHold}
            step={0.01}
          />
        </div>
      </label>
    );
  }

  return (
    <label htmlFor={props.fieldName} className={itemClasses}>
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
