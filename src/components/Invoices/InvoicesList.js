import classes from './InvoicesList.module.css';
import InvoicesItem from './InvoicesItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const InvoicesList = () => {
  const invoices = useSelector(state => state.invoices.invoices);
  const navigate = useNavigate();

  const openInvoiceDetailsHandler = id => {
    navigate(`./${id}`);
  };

  return (
    <section className={classes.invoicesList}>
      {invoices.map(item => (
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
