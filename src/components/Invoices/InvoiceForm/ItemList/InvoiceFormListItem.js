import { Fragment } from 'react';

import classes from './InvoiceFormListItem.module.css';
import Button from '../../../UI/Elements/Button';
import binSVG from '../../../../assets/icon-delete.svg';

const InvoiceFormListItem = props => {
  const { id, name, price, quantity, total } = props.item;

  const inputFieldOnChangeHandler = event => {
    props.onUpdate(props.item.id, event.target.id, event.target.value);
  };

  return (
    <Fragment>
      <label
        htmlFor='Item Name'
        id='name'
        className={`${classes.gridItem} ${classes.gridAreaItemName}`}
      >
        <p>Item Name</p>
        <input
          type='text'
          value={name}
          id='name'
          onChange={inputFieldOnChangeHandler}
        />
      </label>
      <label htmlFor='Qty.' id='quantity' className={classes.gridItem}>
        <p>Qty.</p>
        <input
          type='text'
          id='quantity'
          value={quantity}
          onChange={inputFieldOnChangeHandler}
        />
      </label>
      <label htmlFor='Price' id='price' className={classes.gridItem}>
        <p>Price</p>
        <input
          type='text'
          id='price'
          value={price.toFixed(2)}
          onChange={inputFieldOnChangeHandler}
        />
      </label>
      <div className={classes.total}>
        <p>Total</p>
        <h4>£{total.toFixed(2)}</h4>
      </div>
      <Button btnType='bin' onClick={props.onDelete.bind(null, id)}>
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
