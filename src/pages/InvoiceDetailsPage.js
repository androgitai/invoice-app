import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { invoicesActions } from '../store/invoices-slice';

import useMediaQuery from '../hooks/use-media-query';

import Wrapper from '../components/UI/Layout/Wrapper';
import InvoiceDetailsHead from '../components/Invoices/InvoiceDetails/InvoiceDetailsHead';
import InvoiceDetailsBody from '../components/Invoices/InvoiceDetails/InvoiceDetailsBody';
import InvoiceDetailsControl from '../components/Invoices/InvoiceDetails/InvoiceDetailsControl';
import ConfirmModal from '../components/UI/Modals/ConfirmModal';
import InvoiceFormModal from '../components/UI/Modals/InvoiceFormModal';
import NotFound from '../components/UI/Elements/NotFound';

const InvoiceDetailsPage = () => {
  const isTablet = useMediaQuery('(min-width:768px)');
  const dispatch = useDispatch();
  const currentInvoice = useSelector(state => state.invoices.currentInvoice);
  const { invoiceId } = useParams();

  useEffect(() => {
    dispatch(invoicesActions.getInvoice(invoiceId));

    return () => {};
  }, [dispatch, invoiceId]);

  if (!currentInvoice) {
    return <NotFound />;
  }

  return (
    <Fragment>
      {/* <InvoiceFormModal /> */}
      <Wrapper>
        {/* <ConfirmModal invoiceId='XM9141' /> */}
        <InvoiceDetailsHead
          invoiceId={invoiceId}
          status={currentInvoice.status}
        />
        <InvoiceDetailsBody />
      </Wrapper>
      {!isTablet && (
        <InvoiceDetailsControl
          status={currentInvoice.status}
          invoiceId={invoiceId}
        />
      )}
    </Fragment>
  );
};

export default InvoiceDetailsPage;
