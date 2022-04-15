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

  const inputChangeHandler = event => {
    const inputId = event.target.id;
    const inputValue = event.target.value;
    props.dispatchChange({ type: 'UPDATE_FORM_INPUT', inputId, inputValue });
  };
  if (props.type === 'select') {
    defVal = props.defVal === 0 ? 30 : props.defVal;

    return (
      <label htmlFor='Payment Terms' className={itemClasses}>
        <p>Payment Terms</p>
        <select
          name='paymentTerms'
          id='paymentTerms'
          form='invoiceForm'
          value={defVal}
          onChange={inputChangeHandler}
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
    <label htmlFor={props.id} className={itemClasses}>
      <p>{props.name}</p>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        disabled={props.disabled}
        required={false}
        value={defVal}
        placeholder={props.placeHold}
        onChange={inputChangeHandler}
      />
    </label>
  );
};

export default FormItem;
