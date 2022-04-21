import { invoicesActions } from './invoices-slice';
import store from './index';

export const fetchAllInvoices = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        'https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app/invoices.json'
      );

      if (!response) throw new Error('Fetching invoices failed.');

      const data = await response.json();
      return data;
    };

    try {
      const data = await fetchData();
      dispatch(invoicesActions.updateInvoices(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchInvoice = invoiceId => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        `https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app/invoices/${invoiceId}.json`
      );

      if (!response) throw new Error('Fetching invoices failed.');

      const data = await response.json();
      return data;
    };

    try {
      const invoice = await fetchData();
      dispatch(invoicesActions.setCurrentInvoice({ invoice, invoiceId }));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteInvoice = invoiceId => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app/invoices/${invoiceId}.json`,
        {
          method: 'DELETE',
        }
      );

      if (!response) throw new Error('Something went wrong...');
    };

    try {
      await sendRequest();
      dispatch(invoicesActions.deleteInvoice(invoiceId));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateInvoiceStatus = invoiceId => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app/invoices/${invoiceId}/.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status: 'paid' }),
        }
      );

      if (!response) throw new Error('Something went wrong...');
    };

    try {
      await sendRequest();
      dispatch(invoicesActions.updateInvoiceStatus(invoiceId));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateInvoice = (updatedInvoice, invoiceId) => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app/invoices/${invoiceId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedInvoice),
        }
      );

      if (!response) throw new Error('Something went wrong...');
    };

    try {
      await sendRequest();
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
    const sendRequest = async () => {
      const response = await fetch(
        `https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app/invoices.json`,
        {
          method: 'POST',
          body: JSON.stringify(newInvoice),
        }
      );
      if (!response) throw new Error('Something went wrong...');
      const newServerId = response.json();
      return newServerId;
    };

    try {
      const { name: newId } = await sendRequest();
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
