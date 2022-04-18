import { invoicesActions } from './invoices-slice';

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

export const updateInvoiceList = (
  newInvoiceItem,
  id,
  submitType,
  currentInvoiceIndex,
  totalInvoices
) => {
  return async dispatch => {
    const sendPatchRequest = async () => {
      const response = await fetch(
        `https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app/invoices.json/`,
        {
          method: 'PATCH',
          body: JSON.stringify({ [currentInvoiceIndex]: newInvoiceItem }),
        }
      );

      if (!response) throw new Error('Something went wrong...');
    };
    const sendPostRequest = async () => {
      const response = await fetch(
        `https://invoice-app-41f77-default-rtdb.europe-west1.firebasedatabase.app/invoices/${totalInvoices}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(newInvoiceItem),
        }
      );

      if (!response) throw new Error('Something went wrong...');
    };

    try {
      if (id === 'new') await sendPostRequest();
      else await sendPatchRequest();

      dispatch(
        invoicesActions.submittedInvoiceHandler({
          newInvoiceItem,
          id,
          submitType,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
