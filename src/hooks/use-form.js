import { useReducer, useState } from 'react';

import { validateForm } from '../lib/form-validations';
import { todaysDate } from '../lib/invoice-utility';
import { newItemTemplate } from '../lib/form-templates';

//////////////////// Form Reducer

const formReducer = (state, action) => {
  if (action.type === 'ADD_NEW_LIST_ITEM') {
    let newFormState = JSON.parse(JSON.stringify(state.formState));
    newFormState.items.push({
      ...newItemTemplate,
      id: state.formState.items.length,
    });
    const { newErrorState, formValidityState } = validateForm(
      newFormState,
      state.formValidityState.canBeEmpty,
      true
    );
    return { formState: newFormState, errorsState: newErrorState, formValidityState };
  }
  if (action.type === 'DELETE_LIST_ITEM') {
    const id = action.id;
    let newFormState = JSON.parse(JSON.stringify(state.formState));
    const filteredItemsState = state.formState.items
      .filter(item => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index };
      });
    newFormState.items = filteredItemsState;
    const { newErrorState, formValidityState } = validateForm(
      newFormState,
      state.formValidityState.canBeEmpty,
      true
    );
    return { formState: newFormState, errorsState: newErrorState, formValidityState };
  }
  if (action.type === 'UPDATE_LIST_INPUT') {
    const { id, key, value } = action;
    let newFormState = JSON.parse(JSON.stringify(state.formState));
    const newItemsState = newFormState.items.map(item => {
      if (item.id === id) {
        switch (key) {
          case 'name':
            return { ...item, name: value };
          case 'quantity': {
            return { ...item, quantity: +value, total: +value * item.price };
          }
          case 'price': {
            return { ...item, price: +value, total: item.quantity * +value };
          }
          default:
            break;
        }
      }
      return item;
    });
    newFormState.items = newItemsState;
    const { newErrorState, formValidityState } = validateForm(
      newFormState,
      state.formValidityState.canBeEmpty,
      true
    );
    return { formState: newFormState, errorsState: newErrorState, formValidityState };
  }
  if (action.type === 'UPDATE_FORM_INPUT') {
    const { inputId, inputValue, isInvoice } = action;
    let newFormState = JSON.parse(JSON.stringify(state.formState));

    if (inputId.includes('.')) {
      const [inputKey, inputSubKey] = inputId.split('.');
      newFormState[inputKey][inputSubKey] = inputValue;
    } else {
      newFormState[inputId] = inputValue;
    }
    const { newErrorState, formValidityState } = validateForm(
      newFormState,
      state.formValidityState.canBeEmpty,
      isInvoice
    );
    return { formState: newFormState, errorsState: newErrorState, formValidityState };
  }
  if (action.type === 'UPDATE_FORM_STATE') {
    const { newFormState, canBeEmpty, isInvoice } = action;
    const newState = formInitializer({
      formData: newFormState,
      canBeEmpty,
      isInvoice,
    });
    return newState;
  }

  return state;
};

/////////////////  Reducer init function

const formInitializer = initialValues => {
  //Building initial state (form state, errors, form validity state)
  console.log('entering init');
  const { formData, canBeEmpty, isInvoice } = initialValues;
  console.log(formData);
  let formDataCopy = JSON.parse(JSON.stringify(formData));
  if (isInvoice) {
    const initialListState = formData.items
      ? formData.items.map((item, index) => {
          return {
            id: index,
            name: item.name,
            quantity: +item.quantity,
            price: +item.price,
            total: +(item.price * item.quantity),
          };
        })
      : [];
    formDataCopy.items = initialListState;
    formDataCopy.createdAt = formData.createdAt ? formData.createdAt : todaysDate;

    const { newErrorState, formValidityState } = validateForm(formDataCopy, canBeEmpty, isInvoice);

    return {
      formState: formDataCopy,
      errorsState: newErrorState,
      formValidityState,
    };
  }
  const { newErrorState, formValidityState } = validateForm(formData, canBeEmpty, isInvoice);

  return { formState: formDataCopy, errorsState: newErrorState, formValidityState };
};

///////////////////////   useForm Hook

const useForm = (formData, { canBeEmpty, isInvoice }) => {
  const [formState, dispatchFormChange] = useReducer(
    formReducer,
    { formData, canBeEmpty, isInvoice },
    formInitializer
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(formState);

  return {
    formState: formState.formState,
    formErrors: isSubmitting ? formState.errorsState : {},
    formValidity: formState.formValidityState,
    isSubmitting,
    dispatchFormChange,
    setIsSubmitting,
  };
};

export default useForm;
