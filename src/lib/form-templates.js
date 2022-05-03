export const invoiceFormTemplate = {
  id: '',
  createdAt: '',
  paymentDue: '',
  description: '',
  paymentTerms: 30,
  clientName: '',
  clientEmail: '',
  status: '',
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
  items: [
    {
      id: 0,
      name: '',
      quantity: 1,
      price: 1,
      total: 0,
    },
  ],
  total: 0,
};

export const invoiceFormErrorsTemplate = {
  id: [],
  createdAt: [],
  paymentDue: [],
  description: [],
  paymentTerms: [],
  clientName: [],
  clientEmail: [],
  status: [],
  senderAddress: {
    street: [],
    city: [],
    postCode: [],
    country: [],
  },
  clientAddress: {
    street: [],
    city: [],
    postCode: [],
    country: [],
  },
  items: [
    {
      id: [],
      name: [],
      quantity: [],
      price: [],
      total: [],
    },
  ],
  total: [],
};
