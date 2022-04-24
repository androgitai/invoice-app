import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './InvoicesList.module.css';
import InvoicesItem from './InvoicesItem';

import NoInvoices from '../UI/Elements/NoInvoices';

const InvoicesList = () => {
  const invoices = useSelector(state => state.invoices.invoices);
  const totalInvoices = useSelector(state => state.invoices.totalInvoices);
  const invoiceFilters = useSelector(state => state.invoices.filterBy);
  const isLoading = useSelector(state => state.ui.isLoading);
  const navigate = useNavigate();

  const openInvoiceDetailsHandler = id => {
    navigate(`./${id}`);
  };

  let invoiceList = [];

  if (invoiceFilters.length !== 0) {
    invoiceFilters.forEach(filterItem =>
      invoices.forEach(item => {
        const invoiceKey = Object.keys(item);
        if (item[invoiceKey].status === filterItem) {
          invoiceList.push(item);
        }
      })
    );
  } else invoiceList = invoices;

  console.log(invoiceList);

  return (
    <section className={classes.invoicesList}>
      {!isLoading && !totalInvoices && <NoInvoices />}
      {invoiceList.map(item => {
        const invoiceKey = Object.keys(item);
        return (
          <InvoicesItem
            key={invoiceKey}
            invoiceId={item[invoiceKey].id}
            paymentDue={item[invoiceKey].paymentDue}
            clientName={item[invoiceKey].clientName}
            total={item[invoiceKey].total}
            status={item[invoiceKey].status}
            onClick={openInvoiceDetailsHandler.bind(null, invoiceKey)}
          />
        );
      })}
    </section>
  );
};

export default InvoicesList;
