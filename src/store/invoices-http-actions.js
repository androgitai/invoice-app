import { invoicesActions } from './invoices-slice';
import { uiActions } from './ui-slice';
import store from './index';

const URL = 'https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app';

const invoiceHttp = async (dispatch, subURL, options = {}) => {
  dispatch(uiActions.setIsLoading());
  const httpRequest = async () => {
    const response = await fetch(`${URL}${subURL}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    const data = await response.json();
    if (data === null) return false;
    return data;
  };
  try {
    const data = await httpRequest();
    dispatch(uiActions.unSetIsLoading());
    return data;
  } catch (error) {
    dispatch(uiActions.unSetIsLoading());
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Something went wrong...',
      })
    );
    return { error: error.message };
  }
};

export const fetchAllInvoices = () => {
  return async dispatch => {
    const { userId, idToken } = store.getState().auth;
    const invoices = await invoiceHttp(dispatch, `/users/${userId}/invoices.json?auth=${idToken}`);
    if (invoices.error || !invoices) {
      return;
    }
    dispatch(invoicesActions.updateInvoices(invoices));
  };
};

export const fetchInvoice = invoiceId => {
  return async dispatch => {
    const { userId, idToken } = store.getState().auth;
    const invoice = await invoiceHttp(
      dispatch,
      `/users/${userId}/invoices/${invoiceId}.json?auth=${idToken}`
    );
    if (invoice.error || !invoice) return;
    dispatch(invoicesActions.setCurrentInvoice({ invoice, invoiceId }));
  };
};

export const deleteInvoice = invoiceId => {
  return async dispatch => {
    const { userId, idToken } = store.getState().auth;
    const response = invoiceHttp(
      dispatch,
      `/users/${userId}/invoices/${invoiceId}.json?auth=${idToken}`,
      {
        method: 'DELETE',
      }
    );
    if (response.error || !response) return;
    dispatch(invoicesActions.deleteInvoice(invoiceId));
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Invoice successfully deleted!',
      })
    );
  };
};

export const updateInvoiceStatus = invoiceId => {
  return async dispatch => {
    const { userId, idToken } = store.getState().auth;
    const response = await invoiceHttp(
      dispatch,
      `/users/${userId}/invoices/${invoiceId}/.json?auth=${idToken}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status: 'paid' }),
      }
    );
    if (response.error || !response) return;
    dispatch(invoicesActions.updateInvoiceStatus(invoiceId));
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Invoice successfully marked as Paid!',
      })
    );
  };
};

export const updateInvoice = (updatedInvoice, invoiceId) => {
  return async dispatch => {
    const { userId, idToken } = store.getState().auth;
    const response = await invoiceHttp(
      dispatch,
      `/users/${userId}/invoices/${invoiceId}.json?auth=${idToken}`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedInvoice),
      }
    );
    if (response.error || !response) return;
    dispatch(
      invoicesActions.submittedFormUpdateInvoiceHandler({
        updatedInvoice,
        invoiceId,
      })
    );
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Invoice successfully updated!',
      })
    );
  };
};

export const sendNewInvoice = newInvoice => {
  return async dispatch => {
    const { userId, idToken } = store.getState().auth;
    const response = await invoiceHttp(dispatch, `/users/${userId}/invoices.json?auth=${idToken}`, {
      method: 'POST',
      body: JSON.stringify(newInvoice),
    });
    console.log(response);
    if (response.error || !response) return;
    dispatch(
      invoicesActions.submittedFormNewInvoiceHandler({
        newInvoice,
        newId: response.name,
      })
    );
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'New invoice seccessfully saved!',
      })
    );
  };
};

//////////////////////

export const populateServer = async item => {
  const sendRequest = async item => {
    const { userId } = store.getState().auth;
    const response = await fetch(
      `https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/invoices.json`,
      {
        method: 'POST',
        body: JSON.stringify(item),
      }
    );

    if (!response) throw new Error('Something went wrong...');
    const data = await response.json();
    return data;
  };

  try {
    const data = await sendRequest(item);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
