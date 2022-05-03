import { useEffect, useReducer, useState } from 'react';

import { todaysDate } from '../lib/invoice-utility';

// Single Input Validation
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
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        error.push('invalid characters');
      }
      break;
    }
    case 'number': {
      if (+input <= 0 || !isFinite(+input)) {
        error.push(`invalid characters`);
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
      // console.log('Input type not recognized.');
      break;
  }
  return error;
};

///Full form validation

const validateFullForm = initialValues => {
  const { formCurrentState, isInvoice } = initialValues;
  console.log('entering full validation');

  let formOverallErrorState = { empty: false, noItems: false, invalid: false, isFormValid: false };
  for (const key in formCurrentState) {
    let inputErrors = [];
    if (typeof formCurrentState[key] === 'object' && !Array.isArray(formCurrentState[key])) {
      for (const subKey in formCurrentState[key]) {
        const inputType = typeof formCurrentState[key][subKey];
        inputErrors = validateInput(formCurrentState[key][subKey], inputType);
      }
    }
    if (
      isInvoice &&
      key !== 'status' &&
      key !== 'createdAt' &&
      key !== 'id' &&
      key !== 'total' &&
      key !== 'paymentDue'
    ) {
      if (typeof formCurrentState[key] === 'string' || typeof formCurrentState[key] === 'number') {
        const inputType = typeof formCurrentState[key];
        inputErrors = validateInput(formCurrentState[key], inputType);
      }
    }
    if (inputErrors && inputErrors.includes(`can't be empty`)) formOverallErrorState.empty = true;
    if (inputErrors && inputErrors.includes(`invalid characters`))
      formOverallErrorState.invalid = true;
  }

  if (isInvoice) {
    let nameErrors = [];
    let quantityErrors = [];
    let priceErrors = [];

    formCurrentState.items.forEach(item => {
      nameErrors = validateInput(item.name, 'text');
      quantityErrors = validateInput(item.quantity, 'number');
      priceErrors = validateInput(item.price, 'number');
      if (nameErrors && nameErrors.includes(`can't be empty`)) formOverallErrorState.empty = true;
      if (nameErrors && nameErrors.includes(`invalid characters`))
        formOverallErrorState.invalid = true;
      if (quantityErrors && quantityErrors.includes(`invalid characters`))
        formOverallErrorState.invalid = true;
      if (priceErrors && priceErrors.includes(`invalid characters`))
        formOverallErrorState.invalid = true;
    });

    if (formCurrentState.items.length === 0) formOverallErrorState.noItems = true;
  }
  if (
    !formOverallErrorState.empty &&
    !formOverallErrorState.invalid &&
    !formOverallErrorState.noItems
  )
    formOverallErrorState.isFormValid = true;
  return formOverallErrorState;
};

//// Form Reducer

const formReducer = (state, action) => {
  if (action.type === 'ADD_NEW_LIST_ITEM') {
    const newItemsState = [
      ...state.formState.items,
      { id: state.formState.items.length, name: '', quantity: 1, price: 1, total: 0 },
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
      formState: { ...state.formState, items: newItemsState },

      errors: { ...state.errors, items: newErrorState },
    };
  }
  if (action.type === 'DELETE_LIST_ITEM') {
    const id = action.id;
    const filteredState = state.formState.items
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
    return {
      ...state,
      formState: { ...state.formState, items: filteredState },
      errors: { ...state.errors, items: newErrorState },
    };
  }
  if (action.type === 'UPDATE_LIST_INPUT') {
    const { id, key, value } = action;
    const newListState = state.formState.items.map(item => {
      if (item.id === id) {
        switch (key) {
          case 'name':
            return { ...item, name: value };
          case 'quantity': {
            return { ...item, quantity: +value, total: +item.quantity * +item.price };
          }
          case 'price': {
            return { ...item, price: +value, total: +item.quantity * +item.price };
          }
          default:
            break;
        }
      }
      return item;
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
      formState: { ...state.formState, items: newListState },
      errors: { ...state.errors, items: newErrorState },
    };
  }
  if (action.type === 'UPDATE_FORM_INPUT') {
    const inputId = action.inputId;
    const inputValue = action.inputValue;
    const inputType = action.inputType;
    const newErrors = validateInput(inputValue, inputType);
    if (inputId.includes('.')) {
      const [inputIdName, inputIdSubName] = inputId.split('.');
      const newInputSubState = { ...state.formState[inputIdName], [inputIdSubName]: inputValue };
      const newState = {
        ...state,
        formState: { ...state.formState, [inputIdName]: newInputSubState },
        errors: {
          ...state.errors,
          [inputIdName]: { ...state.errors[inputIdName], [inputIdSubName]: newErrors },
        },
      };
      return newState;
    }
    return {
      ...state,
      formState: { ...state.formState, [inputId]: inputValue },
      errors: { ...state.errors, [inputId]: newErrors },
    };
  }

  return formReducer;
};

/////////////////  Reducer init function

const invoiceFormInitializer = initialValues => {
  const { formData, formDataErrors, isInvoice } = initialValues;
  console.log('entering init');

  let initialErrorsState = JSON.parse(JSON.stringify(formDataErrors));
  // Initial validation
  for (const key in formData) {
    let inputErrors;
    if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
      for (const subKey in formData[key]) {
        const inputType = typeof formData[key][subKey];
        inputErrors = validateInput(formData[key][subKey], inputType);
        initialErrorsState[key][subKey] = inputErrors;
      }
    }
    if (isInvoice && key !== 'status' && key !== 'createdAt' && key !== 'id' && key !== 'total') {
      if (typeof formData[key] === 'string' || typeof formData[key] === 'number') {
        const inputType = typeof formData[key];
        inputErrors = validateInput(formData[key], inputType);
        initialErrorsState[key] = inputErrors;
      }
    }
  }

  if (isInvoice) {
    const initialItemsErrorState = formData.items.map((item, index) => {
      return {
        id: index,
        name: validateInput(item.name, 'text'),
        quantity: validateInput(item.quantity, 'number'),
        price: validateInput(item.price, 'number'),
        total: item.price * item.quantity,
      };
    });

    initialErrorsState.items = initialItemsErrorState;
  }

  //Building initial state (formState,errors)

  if (!isInvoice) return { formState: { ...formData }, errors: initialErrorsState };

  if (isInvoice) {
    const initialListState = formData.items.map((item, index) => {
      return {
        id: index,
        name: item.name,
        quantity: +item.quantity,
        price: +item.price,
        total: +(item.price * item.quantity),
      };
    });

    return {
      formState: {
        ...formData,
        createdAt: formData.createdAt ? formData.createdAt : todaysDate,
        items: initialListState,
      },
      errors: initialErrorsState,
    };
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const useForm = (formData, formDataErrors, isInvoice = false) => {
  const [formState, dispatchFormChange] = useReducer(
    formReducer,
    { formData, formDataErrors, isInvoice },
    invoiceFormInitializer
  );

  const [validating, setValidating] = useState(false);
  const [fullFormValidity, setfullFormValidity] = useState({
    empty: true,
    noItems: true,
    invalid: true,
    isFormValid: false,
  });

  useEffect(() => {
    const formCurrentState = formState.formState;
    setfullFormValidity(validateFullForm({ formCurrentState, isInvoice }));
  }, [formState, isInvoice]);

  console.log(formState);
  console.log(fullFormValidity);

  return {
    formState: formState.formState,
    formErrors: validating ? formState.errors : formDataErrors,
    fullFormValidity,
    validating,
    dispatchFormChange,
    setValidating,
  };
};

export default useForm;
