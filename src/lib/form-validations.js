export const validateInput = (input, type, canBeEmpty, searchWord = '') => {
  let error = [];
  if (!canBeEmpty) {
    if (input.length === 0) {
      error.push(`can't be empty`);
    }
  }

  switch (type) {
    case 'string': {
      if (
        searchWord &&
        searchWord.includes('mail') &&
        input.length !== 0 &&
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input)
      ) {
        error.push(`invalid email`);
        break;
      }
      if (searchWord && searchWord.includes('phone') && !/^[+0-9]*$/.test(input)) {
        error.push(`invalid number`);
        break;
      }

      if (!searchWord.includes('mail') && !/^[a-zA-Z0-9_ ]*$/.test(input)) {
        error.push(`invalid characters`);
      }
      break;
    }
    case 'text': {
      if (
        searchWord &&
        searchWord.includes('mail') &&
        input.length !== 0 &&
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input)
      ) {
        error.push(`invalid email`);
        break;
      }
      if (
        (input.length < 8 && searchWord && searchWord.includes('phone')) ||
        (searchWord && searchWord.includes('phone') && !/^[0-9]*$/.test(input))
      ) {
        error.push(`invalid number`);
        break;
      }
      if (!/^[a-zA-Z0-9_ ]*$/.test(input)) {
        error.push(`invalid characters`);
      }
      break;
    }

    case 'email': {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        error.push(`invalid email`);
      }
      break;
    }
    case 'number': {
      if (+input <= 0 || !isFinite(input)) {
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
      break;
  }
  return error;
};

export const validateForm = (formState, canBeEmpty, isInvoice) => {
  const newErrorState = {};
  const formValidityState = {
    empty: false,
    noItems: false,
    invalid: false,
    canBeEmpty,
    isFormValid: false,
  };

  for (const key in formState) {
    let inputErrors = [];
    if (typeof formState[key] === 'object' && !Array.isArray(formState[key])) {
      for (const subKey in formState[key]) {
        const inputType = typeof formState[key][subKey];
        const error = validateInput(formState[key][subKey], inputType, canBeEmpty, subKey);
        inputErrors.push(error);
        newErrorState[key] = { ...newErrorState[key], [subKey]: error };
      }
    }
    if (
      !isInvoice ||
      (isInvoice &&
        key !== 'status' &&
        key !== 'createdAt' &&
        key !== 'id' &&
        key !== 'total' &&
        key !== 'paymentDue' &&
        key !== 'paymentTerms')
    ) {
      if (typeof formState[key] === 'string' || typeof formState[key] === 'number') {
        const inputType = typeof formState[key];
        const error = validateInput(formState[key], inputType, canBeEmpty, key);
        inputErrors.push(error);
        newErrorState[key] = error;
      }
    }
    inputErrors.forEach(error => {
      if (error.includes(`can't be empty`)) formValidityState.empty = true;
      if (
        error.includes('invalid characters') ||
        error.includes('invalid email') ||
        error.includes('invalid number')
      )
        formValidityState.invalid = true;
    });
  }

  if (isInvoice) {
    const newItemsErrorState = formState.items.map((item, index) => {
      const nameErrors = validateInput(item.name, 'text', canBeEmpty);
      const quantityErrors = validateInput(item.quantity, 'number', canBeEmpty);
      const priceErrors = validateInput(item.price, 'number', canBeEmpty);
      if (nameErrors && nameErrors.includes(`can't be empty`)) {
        formValidityState.empty = true;
      }
      if (
        (nameErrors && nameErrors.includes(`invalid characters`)) ||
        (quantityErrors && quantityErrors.includes(`invalid characters`)) ||
        (priceErrors && priceErrors.includes(`invalid characters`))
      ) {
        formValidityState.invalid = true;
      }
      return {
        id: index,
        name: nameErrors,
        quantity: quantityErrors,
        price: priceErrors,
        total: item.price * item.quantity,
      };
    });

    newErrorState.items = newItemsErrorState;
    if (formState.items.length === 0) formValidityState.noItems = true;
  }

  if (!formValidityState.empty && !formValidityState.invalid && !formValidityState.noItems)
    formValidityState.isFormValid = true;

  return { newErrorState, formValidityState };
};
