export const emptyFormTemplate = {
  id: '',
  createdAt: '',
  paymentDue: '',
  description: '',
  paymentTerms: 30,
  clientName: '',
  clientEmail: '',
  status: '',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  items: [
    {
      id: 0,
      name: '',
      quantity: 1,
      price: 0,
      total: 0,
    },
  ],
  total: 0,
};

export const calculateAndFormatDueDate = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);

  const newPaymentDueDate = [
    result.getFullYear(),
    (result.getMonth() + 1).toString().padStart(2, '0'),
    result.getDate().toString().padStart(2, '0'),
  ].join('-');
  return newPaymentDueDate;
};

export const idGenerator = currentIds => {
  const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getNewChar = () =>
    DEFAULT_ALPHABET.charAt(Math.floor(Math.random() * DEFAULT_ALPHABET.length));
  const getNewNumber = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  const newId = getNewChar() + getNewChar() + getNewNumber;
  if (currentIds.includes(newId)) return idGenerator(currentIds);
  return newId;
};

export const generateInvoice = (formState, id, submitType, currentIds) => {
  let currentId = id;

  if (id === 'new') {
    currentId = idGenerator(currentIds);
  }
  const grandTotalAmount = formState.items.reduce((sum, item) => (sum += item.total), 0);

  const newDueDate = calculateAndFormatDueDate(formState.createdAt, +formState.paymentTerms);

  const newInvoiceItem = {
    ...formState,
    id: currentId,
    status: submitType === 'draft' ? 'draft' : 'pending',
    paymentDue: newDueDate,
    total: grandTotalAmount,
  };
  return newInvoiceItem;
};
