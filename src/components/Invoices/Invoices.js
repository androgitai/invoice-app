import classes from './Invoices.module.css';

const Invoices = props => {
  return <main className={classes.invoices}>{props.children}</main>;
};

export default Invoices;
