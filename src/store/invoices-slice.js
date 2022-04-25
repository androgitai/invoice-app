import { createSlice } from '@reduxjs/toolkit';
import { emptyFormTemplate } from '../lib/invoice-utility';

const invoicesInitialState = {
  invoices: [],
  totalInvoices: 0,
  currentInvoice: emptyFormTemplate,
  currentInvoiceId: null,
  emptyFormTemplate,
  filterBy: [],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: invoicesInitialState,
  reducers: {
    updateInvoices(state, action) {
      const invoices = action.payload;
      let newInvoiceList = [];
      for (const item in invoices) {
        newInvoiceList.push({ [item]: invoices[item] });
      }
      state.invoices = newInvoiceList;
      state.totalInvoices = newInvoiceList.length;
    },
    setCurrentInvoice(state, action) {
      const { invoice, invoiceId } = action.payload;
      state.currentInvoice = invoice;
      state.currentInvoiceId = invoiceId;
    },
    updateInvoiceStatus(state, action) {
      const invoiceId = action.payload;
      const invoiceIndex = state.invoices.findIndex(item => {
        return Object.keys(item)[0] === invoiceId;
      });
      if (invoiceIndex !== -1) {
        state.invoices[invoiceIndex][invoiceId].status = 'paid';
        state.currentInvoice.status = 'paid';
      }
    },
    deleteInvoice(state, action) {
      const invoiceId = action.payload;
      const newInvoiceState = state.invoices.filter(item => !Object.keys(item).includes(invoiceId));
      if (newInvoiceState) {
        state.invoices = newInvoiceState;
        state.currentInvoice = null;
        state.currentInvoiceId = null;
        state.totalInvoices = state.invoices.length;
      }
    },
    submittedFormUpdateInvoiceHandler(state, action) {
      const { updatedInvoice, invoiceId } = action.payload;
      const invoiceIndex = state.invoices.findIndex(item => {
        return Object.keys(item)[0] === invoiceId;
      });
      if (invoiceIndex !== -1) {
        state.invoices[invoiceIndex][invoiceId] = updatedInvoice;
        state.currentInvoice = updatedInvoice;
        state.totalInvoices = state.invoices.length;
      }
    },
    submittedFormNewInvoiceHandler(state, action) {
      const { newInvoice, newId } = action.payload;
      state.invoices.push({ [newId]: newInvoice });
      state.totalInvoices = state.invoices.length;
    },
    resetInvoiceData(state) {
      state.invoices = [];
      state.totalInvoices = 0;
      state.currentInvoice = null;
      state.currentInvoiceId = null;
      state.filterBy = [];
    },
    toggleFilter(state, action) {
      const filterTerm = action.payload;
      if (filterTerm === '') return;
      if (state.filterBy.includes(filterTerm)) {
        state.filterBy = state.filterBy.filter(item => item !== filterTerm);
      } else {
        state.filterBy.push(filterTerm);
      }
    },
  },
});

export const invoicesActions = invoicesSlice.actions;

export default invoicesSlice;
