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
      quantity: 0,
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

export const idGenerator = () => {
  const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getNewChar = () =>
    DEFAULT_ALPHABET.charAt(
      Math.floor(Math.random() * DEFAULT_ALPHABET.length)
    );
  const getNewNumber = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  const newId = getNewChar() + getNewChar() + getNewNumber;
  return newId;
};

export const generateInvoice = (
  id,
  submittedData,
  listItemsState,
  submitType,
  currentInvoiceStatus
) => {
  let status = currentInvoiceStatus;
  let currentId = id;

  if (id === 'new') {
    currentId = idGenerator();
  }
  if (submitType === 'draft') status = 'draft';
  if (submitType === 'send') status = 'pending';

  const grandTotalAmount = listItemsState.reduce(
    (sum, item) => (sum += item.total),
    0
  );

  const newDueDate = calculateAndFormatDueDate(
    submittedData.createdAt,
    +submittedData.paymentTerms
  );

  const newInvoiceItem = {
    id: currentId,
    createdAt: submittedData.createdAt,
    paymentDue: newDueDate,
    description: submittedData.description,
    paymentTerms: +submittedData.paymentTerms,
    clientName: submittedData.clientName,
    clientEmail: submittedData.clientEmail,
    status: status,
    senderAddress: {
      street: submittedData.senderAddressStreet,
      city: submittedData.senderAddressCity,
      postCode: submittedData.senderAddressPostcode,
      country: submittedData.senderAddressCountry,
    },
    clientAddress: {
      street: submittedData.clientAddressStreet,
      city: submittedData.clientAddressCity,
      postCode: submittedData.clientAddressPostcode,
      country: submittedData.clientAddressCountry,
    },
    items: listItemsState,
    total: grandTotalAmount,
  };
  return newInvoiceItem;
};
