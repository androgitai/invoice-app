import classes from './InvoicesList.module.css';
import InvoiceItem from './InvoiceItem';

const InvoicesList = () => {
  return (
    <section className={classes.invoicesList}>
      <InvoiceItem />
      <InvoiceItem />
      <InvoiceItem />
      <InvoiceItem />
      <InvoiceItem />
    </section>
  );
};

export default InvoicesList;
