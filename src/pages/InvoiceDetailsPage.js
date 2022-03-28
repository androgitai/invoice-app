import Wrapper from '../components/UI/Layout/Wrapper';
import InvoiceDetailsHead from '../components/Invoices/InvoiceDetails/InvoiceDetailsHead';
import InvoiceDetailsBody from '../components/Invoices/InvoiceDetails/InvoiceDetailsBody';
import InvoiceDetailsControl from '../components/Invoices/InvoiceDetails/InvoiceDetailsControl';
import { Fragment } from 'react';

const Invoice = () => {
  return (
    <Fragment>
      <Wrapper>
        <InvoiceDetailsHead />
        <InvoiceDetailsBody />
      </Wrapper>
      <InvoiceDetailsControl />
    </Fragment>
  );
};

export default Invoice;
