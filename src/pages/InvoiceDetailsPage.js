import { Fragment } from 'react';

import Wrapper from '../components/UI/Layout/Wrapper';
import InvoiceDetailsHead from '../components/Invoices/InvoiceDetails/InvoiceDetailsHead';
import InvoiceDetailsBody from '../components/Invoices/InvoiceDetails/InvoiceDetailsBody';
import InvoiceDetailsControl from '../components/Invoices/InvoiceDetails/InvoiceDetailsControl';
import ConfirmModal from '../components/UI/Modals/ConfirmModal';
import useMediaQuery from '../hooks/use-media-query';

const Invoice = () => {
  const isTablet = useMediaQuery('(min-width:768px)');

  return (
    <Fragment>
      <Wrapper>
        {/* <ConfirmModal invoiceId='XM9141' /> */}
        <InvoiceDetailsHead />
        <InvoiceDetailsBody />
      </Wrapper>
      {!isTablet && <InvoiceDetailsControl />}
    </Fragment>
  );
};

export default Invoice;
