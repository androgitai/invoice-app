import { useReducer } from 'react';

const formReducer = (state, action) => {
  if (action.type === 'ADD_NEW_LIST_ITEM') {
    return {
      ...state,
      items: [
        ...state.items,
        { id: state.items.length, name: '', quantity: 1, price: 0, total: 0 },
      ],
    };
  }
  if (action.type === 'DELETE_LIST_ITEM') {
    const id = action.id;
    const filteredState = state.items
      .filter(item => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index };
      });
    return { ...state, items: filteredState };
  }
  if (action.type === 'UPDATE_LIST_INPUT') {
    const { id, key, value } = action;
    const newListState = [...state.items];
    newListState.forEach(item => {
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
    return { ...state, items: newListState };
  }
  if (action.type === 'UPDATE_FORM_INPUT') {
    const inputId = action.inputId;
    const inputValue = action.inputValue;
    if (inputId.includes('.')) {
      const [inputIdName, inputIdSubName] = inputId.split('.');
      const newInputSubState = { ...state[inputIdName], [inputIdSubName]: inputValue };
      const newState = { ...state, [inputIdName]: newInputSubState };
      return newState;
    }
    return { ...state, [inputId]: inputValue };
  }

  return formReducer;
};

const useForm = formData => {
  const todaysDate = [
    new Date().getFullYear(),
    (new Date().getMonth() + 1).toString().padStart(2, '0'),
    new Date().getDate().toString().padStart(2, '0'),
  ].join('-');

  const initialListState = formData.items.map((item, index) => {
    return {
      id: index,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    };
  });
  const initialState = {
    ...formData,
    items: initialListState,
    createdAt: formData.createdAt ? formData.createdAt : todaysDate,
  };

  const [formState, dispatchFormChange] = useReducer(formReducer, initialState);
  return {
    formState,
    dispatchFormChange,
  };
};

export default useForm;
