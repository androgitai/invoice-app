import { Fragment } from 'react';
import classes from './InvoiceDetailsItemsHead.module.css';

const InvoiceDetailsItemsHead = () => {
  return (
    <Fragment>
      <p className={classes.first}>Item Name</p>
      <p>QTY.</p>
      <p>Price</p>
      <p>Total</p>
    </Fragment>
  );
};

export default InvoiceDetailsItemsHead;
