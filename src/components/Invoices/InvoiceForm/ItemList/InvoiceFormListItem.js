import { Fragment } from 'react';

import classes from './InvoiceFormListItem.module.css';
import InvoiceFormItem from '../InvoiceFormItem';
import Button from '../../../UI/Elements/Button';
import binSVG from '../../../../assets/icon-delete.svg';

const InvoiceFormListItem = () => {
  return (
    <Fragment>
      <InvoiceFormItem type='text' name='Item Name' />
      <InvoiceFormItem type='number' name='Qty.' />
      <InvoiceFormItem type='text' name='Price' />
      <div className={classes.total}>
        <p>Total</p>
        <h4>400.00</h4>
      </div>
      <Button btnType='bin'>
        <img
          className={classes.binButton}
          src={binSVG}
          alt='Delete List Item'
        />
      </Button>
    </Fragment>
  );
};

export default InvoiceFormListItem;
