import { useCallback, useEffect, useReducer, useState } from 'react';

import { todaysDate } from '../lib/invoice-utility';
import { idGenerator } from '../lib/invoice-utility';

const validateInput = (input, type) => {
  let error = [];
  if (input.length === 0) {
    error.push(`can't be empty`);
    return error;
  }
  switch (type) {
    case 'text': {
      if (!/^[a-zA-Z0-9_ ]*$/.test(input)) {
        error.push('invalid characters');
      }
      break;
    }
    case 'email': {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        error.push('invalid characters');
      }
      break;
    }
    case 'number': {
      if (+input <= 0) {
        error.push(`invalid`);
      }
      break;
    }
    case 'date': {
      break;
    }
    case 'select-one': {
      break;
    }

    default:
      console.log('Input type not recognized.');
      break;
  }
  return error;
};

const formReducer = (state, action) => {
  if (action.type === 'ADD_NEW_LIST_ITEM') {
    const newItemsState = [
      ...state.items,
      { id: state.items.length, name: '', quantity: 1, price: 1, total: 0 },
    ];
    const newErrorState = newItemsState.map((item, index) => {
      return {
        id: index,
        name: validateInput(item.name, 'text'),
        quantity: validateInput(item.quantity, 'number'),
        price: validateInput(item.price, 'number'),
        total: item.price * item.quantity,
      };
    });
    return {
      ...state,
      errors: { ...state.errors, items: newErrorState },
      items: newItemsState,
    };
  }
  if (action.type === 'DELETE_LIST_ITEM') {
    const id = action.id;
    const filteredState = state.items
      .filter(item => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index };
      });
    const newErrorState = filteredState.map((item, index) => {
      return {
        id: index,
        name: validateInput(item.name, 'text'),
        quantity: validateInput(item.quantity, 'number'),
        price: validateInput(item.price, 'number'),
        total: item.price * item.quantity,
      };
    });
    return { ...state, errors: { ...state.errors, items: newErrorState }, items: filteredState };
  }
  if (action.type === 'UPDATE_LIST_INPUT') {
    const { id, key, value, inputType } = action;
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
    const newErrorState = newListState.map((item, index) => {
      return {
        id: index,
        name: validateInput(item.name, 'text'),
        quantity: validateInput(item.quantity, 'number'),
        price: validateInput(item.price, 'number'),
        total: item.price * item.quantity,
      };
    });
    return {
      ...state,
      errors: { ...state.errors, items: newErrorState },
      items: newListState,
    };
  }
  if (action.type === 'UPDATE_FORM_INPUT') {
    const inputId = action.inputId;
    const inputValue = action.inputValue;
    const inputType = action.inputType;
    const newErrors = validateInput(inputValue, inputType);
    if (inputId.includes('.')) {
      const [inputIdName, inputIdSubName] = inputId.split('.');
      const newInputSubState = { ...state[inputIdName], [inputIdSubName]: inputValue };
      const newState = {
        ...state,
        errors: {
          ...state.errors,
          [inputIdName]: { ...state.errors[inputIdName], [inputIdSubName]: newErrors },
        },
        [inputIdName]: newInputSubState,
      };
      return newState;
    }
    return { ...state, errors: { ...state.errors, [inputId]: newErrors }, [inputId]: inputValue };
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
  // let errors = [];
  for (const key in formData) {
    if (typeof formData[key] === 'object') {
      if (Array.isArray(formData[key])) {
        console.log('array', formData[key]);
        formData[key].forEach(item => {
          if (typeof item === 'object' && Array.isArray(item)) {
            console.log('array > array');
          } else {
            console.log('array > obejct');
            for (const subK in item) {
              console.log(`string/number`, subK, item[subK]);
            }
          }
        });
      }
      if (!Array.isArray(formData[key])) {
        for (const subkey in formData[key]) {
          if (typeof formData[key][subkey] === 'object' && Array.isArray(formData[key][subkey])) {
            console.log('object > array');
          } else if (typeof formData[key][subkey] === 'object') {
            console.log('object > object');
          } else {
            console.log('object > ', typeof formData[key][subkey]);
          }
        }
        console.log('object', formData[key]);
      }
    }
    if (typeof formData[key] === 'string') {
      console.log('string', formData[key]);
    }
    if (typeof formData[key] === 'number') {
      console.log('number', formData[key]);
    }
  }

  const initialListState = formData.items.map((item, index) => {
    return {
      id: index,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    };
  });
  const initialItemsErrorState = formData.items.map((item, index) => {
    return {
      id: index,
      name: validateInput(item.name, 'text'),
      quantity: validateInput(item.quantity, 'number'),
      price: validateInput(item.price, 'number'),
      total: item.price * item.quantity,
    };
  });
  const initialState = {
    ...formData,
    items: initialListState,
    createdAt: formData.createdAt ? formData.createdAt : todaysDate,
    errors: { items: initialItemsErrorState },
  };

  const [formState, dispatchFormChange] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState(initialErrorState);
  const [allFormErrors, setAllFormErrors] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [validating, setValidating] = useState(false);

  //Validation funcion for empty input fields or empty item list
  const validateFormData = useCallback(() => {
    setIsFormValid(true);
    setAllFormErrors('');
    const validateInputField = (inputs, comparedData, subLevel = null) => {
      for (const inputField in inputs) {
        if (comparedData[inputField].length === 0) {
          setIsFormValid(false);
          setAllFormErrors(`- All fields must be added`);
          if (!subLevel) {
            setErrors(prevState => {
              return { ...prevState, [inputField]: `can't be empty` };
            });
          }
          if (subLevel) {
            setErrors(prevState => {
              return {
                ...prevState,
                [subLevel]: { ...prevState[subLevel], [inputField]: `can't be empty` },
              };
            });
          }
        }
      }
    };
    validateInputField(initialErrorState, formState);
    validateInputField(initialErrorState.clientAddress, formState.clientAddress, 'clientAddress');
    validateInputField(initialErrorState.senderAddress, formState.senderAddress, 'senderAddress');

    if (formState.items.length === 0) {
      setErrors(prevState => {
        setIsFormValid(false);
        return { ...prevState, items: `- An item must be added` };
      });
    } else {
      setErrors(prevState => {
        return { ...prevState, items: '' };
      });
    }
  }, [formState]);

  useEffect(() => {
    validateFormData();
  }, [validateFormData]);

  useEffect(() => {
    setErrors(initialErrorState);
    if (validating) {
      setErrors(prevState => {
        return { ...prevState, items: formState.items };
      });
      validateFormData();
    }
  }, [formState, validateFormData, validating]);

  return {
    formState,
    dispatchFormChange,
    errors,
    isFormValid,
    setValidating,
    validating,
    allFormErrors,
  };
};

export default useForm;
