import { Fragment, useLayoutEffect, useState } from 'react';

import classes from './InvoiceFormListItem.module.css';
import Button from '../../../UI/Elements/Button';
import binSVG from '../../../../assets/icon-delete.svg';

const InvoiceFormListItem = props => {
  const [item, setItem] = useState(props.item);

  useLayoutEffect(() => {
    setItem(props.item);
  }, [props.item]);

  console.log(props.item.name);
  return (
    <Fragment>
      <label
        htmlFor='Item Name'
        className={`${classes.gridItem} ${classes.gridAreaItemName}`}
      >
        <p>Item Name</p>
        <input type='text' defaultValue={item.name} />
      </label>
      <label htmlFor='Qty.' className={classes.gridItem}>
        <p>Qty.</p>
        <input type='text' defaultValue={item.quantity} />
      </label>
      <label htmlFor='Price' className={classes.gridItem}>
        <p>Price</p>
        <input type='text' defaultValue={item.price.toFixed(2)} />
      </label>
      {/* <InvoiceFormItem
        type='text'
        name='Item Name'
        defVal={props.name}
        gridArea='gridAreaItemName'
      />
      <InvoiceFormItem type='text' name='Qty.' defVal={props.quantity} />
      <InvoiceFormItem type='price' name='Price' defVal={props.price} /> */}
      <div className={classes.total}>
        <p>Total</p>
        <h4>£{item.total.toFixed(2)}</h4>
      </div>
      <Button btnType='bin' onClick={props.onDelete.bind(null, props.id)}>
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
