import { invoicesActions } from './invoices-slice';

const URL = 'https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app';

const invoiceHttp = async (subURL, options = {}) => {
  const response = await fetch(`${URL}${subURL}`, options);

  if (!response) throw new Error('Something went wrong...');
  const data = response.json();
  return data;
};

export const fetchAllInvoices = () => {
  return async dispatch => {
    try {
      const invoices = await invoiceHttp(`/invoices.json`);
      dispatch(invoicesActions.updateInvoices(invoices));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchInvoice = invoiceId => {
  return async dispatch => {
    try {
      const invoice = await invoiceHttp(`/invoices/${invoiceId}.json`);
      dispatch(invoicesActions.setCurrentInvoice({ invoice, invoiceId }));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteInvoice = invoiceId => {
  return async dispatch => {
    try {
      await invoiceHttp(`/invoices/${invoiceId}.json`, {
        method: 'DELETE',
      });
      dispatch(invoicesActions.deleteInvoice(invoiceId));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateInvoiceStatus = invoiceId => {
  return async dispatch => {
    try {
      await invoiceHttp(`/invoices/${invoiceId}/.json`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'paid' }),
      });
      dispatch(invoicesActions.updateInvoiceStatus(invoiceId));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateInvoice = (updatedInvoice, invoiceId) => {
  return async dispatch => {
    try {
      await invoiceHttp(`/invoices/${invoiceId}.json`, {
        method: 'PUT',
        body: JSON.stringify(updatedInvoice),
      });
      dispatch(
        invoicesActions.submittedFormUpdateInvoiceHandler({
          updatedInvoice,
          invoiceId,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const sendNewInvoice = newInvoice => {
  return async dispatch => {
    try {
      const { name: newId } = await invoiceHttp(`/invoices.json`, {
        method: 'POST',
        body: JSON.stringify(newInvoice),
      });
      console.log(newId);
      dispatch(
        invoicesActions.submittedFormNewInvoiceHandler({
          newInvoice,
          newId,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
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
