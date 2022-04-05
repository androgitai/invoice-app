import { Fragment, useReducer } from 'react';

import InvoiceFormListItem from './InvoiceFormListItem';
import Button from '../../../UI/Elements/Button';
import InvoiceFieldset from '../Layout/InvoiceFieldset';
import classes from './InvoiceFormList.module.css';

const listItemsReducer = (state, action) => {
  if (action.type === 'ADD_NEW_ITEM') {
    return [
      ...state,
      {
        id: state.length,
        name: '',
        quantity: 1,
        price: 0,
        total: 0,
      },
    ];
  }
  if (action.type === 'DELETE_ITEM') {
    const id = action.id;
    const filteredState = state
      .filter(item => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index };
      });
    return filteredState;
  }
  if (action.type === 'UPDATE_INPUT') {
    const { id, key, value } = action;
    console.log(id, key, value);
    const newState = [...state];
    newState.forEach(item => {
      if (item.id === id) {
        switch (key) {
          case 'name':
            item[key] = value;
            break;
          case 'quantity': {
            item[key] = +value;
            item.total = item.quantity * item.price;
            break;
          }
          case 'price': {
            item[key] = +value;
            item.total = item.quantity * item.price;
            break;
          }
          default:
            break;
        }
      }
    });
    return newState;
  }

  return state;
};

const InvoiceFormList = props => {
  const initialState = props.items.map((item, index) => {
    return {
      id: index,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    };
  });
  const [listItemsState, dispatchListItem] = useReducer(
    listItemsReducer,
    initialState
  );
  console.log(listItemsState);

  const addNewListItemHandler = () => {
    dispatchListItem({ type: 'ADD_NEW_ITEM' });
  };

  const removeListItemHandler = id => {
    dispatchListItem({ type: 'DELETE_ITEM', id });
  };

  const updateListItemField = (id, key, value) => {
    // console.log(id, key, value);
    dispatchListItem({ type: 'UPDATE_INPUT', id, key, value });
  };

  return (
    <Fragment>
      <InvoiceFieldset
        fieldName='Item List'
        legendStyle={classes.header}
        gridType='itemList'
      >
        {listItemsState.map(item => {
          return (
            <InvoiceFormListItem
              key={item.id}
              item={item}
              onDelete={removeListItemHandler}
              onUpdate={updateListItemField}
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
