import FormItem from './FormItem';
import classes from './InvoiceFormListItem.module.css';
import Button from '../../UI/Elements/Button';
import binSVG from '../../../assets/icon-delete.svg';
import { Fragment } from 'react';

const InvoiceFormListItem = () => {
  return (
    <Fragment>
      <FormItem type='text' name='Item Name' />
      <FormItem type='number' name='Qty.' />
      <FormItem type='text' name='Price' />
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
