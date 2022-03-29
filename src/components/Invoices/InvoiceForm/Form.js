import classes from './Form.module.css';

const Form = props => {
  return (
    <form onSubmit={props.onSubmit} id='invoiceForm' className={classes.form}>
      {props.children}
    </form>
  );
};

export default Form;
