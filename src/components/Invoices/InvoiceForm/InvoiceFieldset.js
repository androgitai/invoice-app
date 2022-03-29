import classes from './InvoiceFieldset.module.css';

const InvoiceFieldset = props => {
  const fieldsetClasses = `${classes.fieldset} ${props.gridAreas}`;

  return (
    <fieldset className={fieldsetClasses}>
      <legend>
        <h4>{props.fieldName}</h4>
      </legend>
      {props.children}
    </fieldset>
  );
};

export default InvoiceFieldset;
