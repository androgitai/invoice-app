import { Fragment } from 'react';

import Wrapper from '../components/UI/Layout/Wrapper';
import InvoiceDetailsHead from '../components/Invoices/InvoiceDetails/InvoiceDetailsHead';
import InvoiceDetailsBody from '../components/Invoices/InvoiceDetails/InvoiceDetailsBody';
import InvoiceDetailsControl from '../components/Invoices/InvoiceDetails/InvoiceDetailsControl';
import ConfirmModal from '../components/UI/Modals/ConfirmModal';

const Invoice = () => {
  return (
    <Fragment>
      <Wrapper>
        {/* <ConfirmModal invoiceId='XM9141' /> */}
        <InvoiceDetailsHead />
        <InvoiceDetailsBody />
      </Wrapper>
      <InvoiceDetailsControl visible='bottom' />
    </Fragment>
  );
};

export default Invoice;
