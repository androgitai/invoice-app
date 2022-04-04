import classes from './InvoiceFieldset.module.css';

const InvoiceFieldset = props => {
  const fieldsetClasses = `${classes.fieldset} ${classes[props.gridType]}`;

  return (
    <fieldset className={fieldsetClasses}>
      <legend>
        <h4 className={props.legendStyle}>{props.fieldName}</h4>
      </legend>
      {props.children}
    </fieldset>
  );
};

export default InvoiceFieldset;
