import { Fragment } from 'react';

import classes from './InvoiceFormListItem.module.css';
import Button from '../../../UI/Elements/Button';
import binSVG from '../../../../assets/icon-delete.svg';

const InvoiceFormListItem = props => {
  const { id, name, price, quantity, total } = props.item;

  const inputFieldOnChangeHandler = event => {
    const listId = id;
    const inputId = event.target.id;
    const inputType = event.target.type;
    const inputValue = event.target.value;
    props.onUpdate(listId, inputId, inputValue, inputType);
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
          onBlur={inputFieldOnChangeHandler}
        />
      </label>
      <label htmlFor='Qty.' id='quantity' className={classes.gridItem}>
        <p>Qty.</p>
        <input
          type='number'
          inputMode='numeric'
          id='quantity'
          placeholder='1'
          value={quantity}
          onChange={inputFieldOnChangeHandler}
          onBlur={inputFieldOnChangeHandler}
        />
      </label>
      <label htmlFor='Price' id='price' className={classes.gridItem}>
        <p>Price</p>
        <input
          type='number'
          inputMode='numeric'
          step='0.01'
          id='price'
          value={+price.toFixed(2)}
          onChange={inputFieldOnChangeHandler}
          onBlur={inputFieldOnChangeHandler}
        />
      </label>
      <div className={classes.total}>
        <p>Total</p>
        <h4>£{total.toFixed(2)}</h4>
      </div>
      <Button btnType='bin' onClick={props.onDelete.bind(null, id)}>
        <img className={classes.binButton} src={binSVG} alt='Delete List Item' />
      </Button>
    </Fragment>
  );
};

export default InvoiceFormListItem;
