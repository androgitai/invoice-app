import { createSlice } from '@reduxjs/toolkit';
import data from '../assets/data.json';

const emptyFormTemplate = {
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

const calculateAndFormatDueDate = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);

  const newPaymentDueDate = [
    result.getFullYear(),
    (result.getMonth() + 1).toString().padStart(2, '0'),
    result.getDate().toString().padStart(2, '0'),
  ].join('-');
  return newPaymentDueDate;
};

const idGenerator = () => {
  const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getNewChar = () =>
    DEFAULT_ALPHABET.charAt(
      Math.floor(Math.random() * DEFAULT_ALPHABET.length)
    );
  const getNewNumber = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  const newId = getNewChar() + getNewChar() + getNewNumber;
  return newId;
};

const invoicesInitialState = {
  invoices: data,
  totalInvoices: data.length,
  currentInvoice: emptyFormTemplate,
  emptyFormTemplate,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: invoicesInitialState,
  reducers: {
    getInvoice(state, action) {
      const requestedID = action.payload;
      const currentInvoice = state.invoices.find(
        item => item.id === requestedID
      );
      state.currentInvoice = currentInvoice ? currentInvoice : null;
      state.totalInvoices = state.invoices.length;
    },
    markAsPaid(state, action) {
      const id = action.payload;
      const currentInvoiceIndex = state.invoices.findIndex(
        item => item.id === id
      );
      if (currentInvoiceIndex !== -1) {
        state.invoices[currentInvoiceIndex].status = 'paid';
        state.currentInvoice.status = 'paid';
        state.totalInvoices = state.invoices.length;
      }
    },
    deleteInvoice(state, action) {
      const id = action.payload;
      state.invoices = state.invoices.filter(item => item.id !== id);
      state.currentInvoice = null;
      state.totalInvoices = state.invoices.length;
    },
    saveAsDraftInvoice(state, action) {
      console.log(
        action.payload.submittedData,
        action.payload.listItemsState,
        action.payload.id
      );
      const { id, submittedData, listItemsState } = action.payload;

      let status = state.currentInvoice.status;
      if (id === 'new') {
        const newId = idGenerator();
        status = 'draft';

        return;
      }

      const grandTotalAmount = listItemsState.reduce(
        (sum, item) => (sum += item.total),
        0
      );

      const newDueDate = calculateAndFormatDueDate(
        submittedData.createdAt,
        +submittedData.paymentTerms
      );

      const invoiceIndex = state.invoices.findIndex(
        invoice => invoice.id === id
      );
      const newInvoiceItem = {
        id: id,
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
      state.invoices[invoiceIndex] = newInvoiceItem;
      state.currentInvoice = newInvoiceItem;
    },
  },
});

export const invoicesActions = invoicesSlice.actions;

export default invoicesSlice;
