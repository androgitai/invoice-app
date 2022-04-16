import { useCallback, useEffect, useReducer, useState } from 'react';

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

const initialErrorState = {
  description: '',
  clientName: '',
  clientEmail: '',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  items: '',
  total: '',
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
  const [errors, setErrors] = useState(initialErrorState);
  const [allFormErrors, setAllFormErrors] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFormData = useCallback(() => {
    setIsFormValid(true);
    setAllFormErrors('');
    for (const inputField in initialErrorState) {
      if (formState[inputField].length === 0) {
        setIsFormValid(false);
        setAllFormErrors(`- All fields must be added`);
        setErrors(prevState => {
          return { ...prevState, [inputField]: `can't be empty` };
        });
      }
    }
    for (const inputField in initialErrorState.clientAddress) {
      if (formState.clientAddress[inputField].length === 0) {
        setErrors(prevState => {
          setIsFormValid(false);
          setAllFormErrors(`- All fields must be added`);
          return {
            ...prevState,
            clientAddress: { ...prevState.clientAddress, [inputField]: `can't be empty` },
          };
        });
      }
    }
    for (const inputField in initialErrorState.senderAddress) {
      if (formState.senderAddress[inputField].length === 0) {
        setErrors(prevState => {
          setIsFormValid(false);
          setAllFormErrors(`- All fields must be added`);
          return {
            ...prevState,
            senderAddress: { ...prevState.senderAddress, [inputField]: `can't be empty` },
          };
        });
      }
    }
    if (formState.items.length === 0) {
      setErrors(prevState => {
        setIsFormValid(false);
        return { ...prevState, items: `- An item must be added` };
      });
    } else
      setErrors(prevState => {
        if (formState.items[0].total === 0) setIsFormValid(false);
        return { ...prevState, items: '' };
      });
  }, [formState]);

  useEffect(() => {
    validateFormData();
  }, [validateFormData]);

  useEffect(() => {
    setErrors(initialErrorState);
    if (isSubmitting) {
      setErrors(prevState => {
        return { ...prevState, items: formState.items };
      });
      validateFormData();
    }
  }, [formState, validateFormData, isSubmitting]);

  return {
    formState,
    dispatchFormChange,
    errors,
    isFormValid,
    setIsSubmitting,
    isSubmitting,
    allFormErrors,
  };
};

export default useForm;
