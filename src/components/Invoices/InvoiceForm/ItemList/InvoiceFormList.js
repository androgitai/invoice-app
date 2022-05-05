import { Fragment } from 'react';

import InvoiceFormListItem from './InvoiceFormListItem';
import Button from '../../../UI/Elements/Button';
import InvoiceFieldset from '../Layout/InvoiceFieldset';
import classes from './InvoiceFormList.module.css';

const InvoiceFormList = props => {
  const { items } = props;

  const addNewListItemHandler = () => {
    props.dispatchChange({ type: 'ADD_NEW_LIST_ITEM' });
  };

  const removeListItemHandler = id => {
    props.dispatchChange({ type: 'DELETE_LIST_ITEM', id });
  };

  const updateListItemField = (id, key, value, inputType) => {
    props.dispatchChange({ type: 'UPDATE_LIST_INPUT', id, key, value });
  };

  return (
    <Fragment>
      <InvoiceFieldset fieldName='Item List' legendStyle={classes.header} gridType='itemList'>
        {items.map((item, index) => {
          return (
            <InvoiceFormListItem
              key={item.id}
              item={item}
              onDelete={removeListItemHandler}
              onUpdate={updateListItemField}
              error={props?.error?.[index]}
            />
          );
        })}
      </InvoiceFieldset>
      <Button btnType='form' onClick={addNewListItemHandler}>
        +Add New Item
      </Button>
    </Fragment>
  );
};

export default InvoiceFormList;
