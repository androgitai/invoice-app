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

export const profileTemplate = {
  name: '',
  phone1: '',
  email: '',
  street: '',
  city: '',
  postCode: '',
  country: '',
};

export const profileErrorsTemplate = {
  name: [],
  phone1: [],
  email: [],
  street: [],
  city: [],
  postCode: [],
  country: [],
};

export const newItemTemplate = {
  id: '',
  name: '',
  quantity: 1,
  price: 1,
  total: 1,
};

export const authRegisterTemplate = {
  name: '',
  email: '',
  password: '',
};
export const authLoginTemplate = {
  email: '',
  password: '',
};
