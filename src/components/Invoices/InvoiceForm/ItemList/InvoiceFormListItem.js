import { Fragment } from 'react';

import classes from './InvoiceFormListItem.module.css';
import InvoiceFormItem from '../InvoiceFormItem';
import Button from '../../../UI/Elements/Button';
import binSVG from '../../../../assets/icon-delete.svg';

const InvoiceFormListItem = props => {
  return (
    <Fragment>
      <InvoiceFormItem
        type='text'
        name='Item Name'
        defVal={props.name}
        gridArea='gridAreaItemName'
      />
      <InvoiceFormItem type='text' name='Qty.' defVal={props.quantity} />
      <InvoiceFormItem type='price' name='Price' defVal={props.price} />
      <div className={classes.total}>
        <p>Total</p>
        <h4>£{props.total.toFixed(2)}</h4>
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
