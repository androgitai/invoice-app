import { createSlice } from '@reduxjs/toolkit';
import { emptyFormTemplate } from '../lib/invoice-utility';

const invoicesInitialState = {
  invoices: [],
  totalInvoices: 0,
  currentInvoice: emptyFormTemplate,
  currentInvoiceIndex: null,
  emptyFormTemplate,
  filterBy: [],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: invoicesInitialState,
  reducers: {
    updateInvoices(state, action) {
      state.invoices = action.payload;
      state.totalInvoices = action.payload.length;
    },
    setCurrentInvoice(state, action) {
      const { data, invoiceId } = action.payload;
      const [currentInvoice] = data.filter(item => item.id === invoiceId);
      const invoiceIndex = data.findIndex(invoice => invoice.id === invoiceId);
      state.currentInvoice = currentInvoice;
      state.currentInvoiceIndex = invoiceIndex;
    },
    markAsPaid(state, action) {
      const currentInvoiceIndex = action.payload;
      state.invoices[currentInvoiceIndex].status = 'paid';
      state.currentInvoice.status = 'paid';
    },
    deleteInvoice(state, action) {
      const id = action.payload;
      state.invoices = state.invoices.filter(item => item.id !== id);
      state.currentInvoice = null;
      state.currentInvoiceIndex = null;
      state.totalInvoices = state.invoices.length;
    },
    submittedInvoiceHandler(state, action) {
      const { newInvoiceItem, id, submitType } = action.payload;

      if (id === 'new' && submitType === 'draft') {
        state.invoices.push(newInvoiceItem);
        console.log('Saved as draft...');
      }
      if (id === 'new' && submitType === 'send') {
        state.invoices.push(newInvoiceItem);
        console.log('Invoice sent...');
      }
      if (id !== 'new' && submitType === 'draft') {
        const invoiceIndex = state.invoices.findIndex(invoice => invoice.id === id);
        state.invoices[invoiceIndex] = newInvoiceItem;
        state.currentInvoice = newInvoiceItem;
        console.log('Saved as draft...');
      }
      if (id !== 'new' && submitType === 'send') {
        const invoiceIndex = state.invoices.findIndex(invoice => invoice.id === id);
        state.invoices[invoiceIndex] = newInvoiceItem;
        state.currentInvoice = newInvoiceItem;
        console.log('Invoice sent...');
      }
      state.totalInvoices = state.invoices.length;
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
