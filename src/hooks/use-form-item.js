import { useReducer } from 'react';

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

  return listItemsReducer;
};

const useFormListItems = items => {
  const initialState = items.map((item, index) => {
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

  return {
    listItemsState,
    dispatchListItem,
  };
};

export default useFormListItems;
