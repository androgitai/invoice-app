import classes from './InvoicesList.module.css';
import InvoicesItem from './InvoicesItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const InvoicesList = () => {
  const invoices = useSelector(state => state.invoices.invoices);
  const invoiceFilters = useSelector(state => state.invoices.filterBy);
  const navigate = useNavigate();

  const openInvoiceDetailsHandler = id => {
    navigate(`./${id}`);
  };

  let invoiceList = [];

  if (invoiceFilters.length !== 0) {
    invoiceFilters.forEach(filterItem =>
      invoices.forEach(item => {
        if (item.status === filterItem) {
          invoiceList.push(item);
        }
      })
    );
  } else invoiceList = invoices;
  console.log(invoiceList);

  return (
    <section className={classes.invoicesList}>
      {invoiceList.map(item => (
        <InvoicesItem
          key={item.id}
          invoiceId={item.id}
          paymentDue={item.paymentDue}
          clientName={item.clientName}
          total={item.total}
          status={item.status}
          onClick={openInvoiceDetailsHandler.bind(null, item.id)}
        />
      ))}
    </section>
  );
};

export default InvoicesList;
