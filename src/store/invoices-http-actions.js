import { invoicesActions } from './invoices-slice';
import { uiActions } from './ui-slice';

const URL = 'https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app';

const invoiceHttp = async (dispatch, subURL, options = {}) => {
  dispatch(uiActions.setIsLoading());
  const httpRequest = async () => {
    const response = await fetch(`${URL}${subURL}`, options);

    if (!response) throw new Error('Something went wrong...');
    const data = await response.json();
    return data;
  };
  try {
    const data = await httpRequest();
    dispatch(uiActions.unSetIsLoading());
    return data;
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Something went wrong...',
      })
    );
    console.log(error.message);
  }
};

export const fetchAllInvoices = () => {
  return async dispatch => {
    const invoices = await invoiceHttp(dispatch, `/invoices.json`);
    dispatch(invoicesActions.updateInvoices(invoices));
  };
};

export const fetchInvoice = invoiceId => {
  return async dispatch => {
    const invoice = await invoiceHttp(dispatch, `/invoices/${invoiceId}.json`);
    dispatch(invoicesActions.setCurrentInvoice({ invoice, invoiceId }));
  };
};

export const deleteInvoice = invoiceId => {
  return async dispatch => {
    await invoiceHttp(dispatch, `/invoices/${invoiceId}.json`, {
      method: 'DELETE',
    });
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
    await invoiceHttp(dispatch, `/invoices/${invoiceId}/.json`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'paid' }),
    });
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
    await invoiceHttp(dispatch, `/invoices/${invoiceId}.json`, {
      method: 'PUT',
      body: JSON.stringify(updatedInvoice),
    });
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
    const { name: newId } = await invoiceHttp(dispatch, `/invoices.json`, {
      method: 'POST',
      body: JSON.stringify(newInvoice),
    });
    dispatch(
      invoicesActions.submittedFormNewInvoiceHandler({
        newInvoice,
        newId,
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

// export const populateServer = async item => {
//   const sendRequest = async item => {
//     const response = await fetch(
//       `https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app/invoices.json`,
//       {
//         method: 'POST',
//         body: JSON.stringify(item),
//       }
//     );

//     if (!response) throw new Error('Something went wrong...');
//     const data = await response.json();
//     return data;
//   };

//   try {
//     const data = await sendRequest(item);
//     console.log(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
