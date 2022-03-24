import { Fragment } from 'react';
import InvoicesHead from '../components/Invoices/InvoicesHead';
import InvoicesList from '../components/Invoices/InvoicesList';

const Invoices = () => {
  return (
    <Fragment>
      <InvoicesHead />
      <InvoicesList />
    </Fragment>
  );
};

export default Invoices;
