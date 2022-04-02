import { Fragment, useEffect, useState } from 'react';
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
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(invoicesActions.getInvoice(invoiceId));

    return () => {};
  }, [dispatch, invoiceId]);

  const toggleInvoiceFormHandler = () => {
    setIsFormOpen(prevState => !prevState);
  };

  if (!currentInvoice) {
    return <NotFound />;
  }
  return (
    <Fragment>
      {isFormOpen && (
        <InvoiceFormModal
          isNewForm={false}
          invoiceId={currentInvoice.id}
          onCancel={toggleInvoiceFormHandler}
        />
      )}
      <Wrapper>
        {/* <ConfirmModal invoiceId='XM9141' /> */}
        <InvoiceDetailsHead
          toggleForm={toggleInvoiceFormHandler}
          invoiceId={invoiceId}
          status={currentInvoice.status}
        />
        <InvoiceDetailsBody />
      </Wrapper>
      {!isTablet && (
        <InvoiceDetailsControl
          toggleForm={toggleInvoiceFormHandler}
          status={currentInvoice.status}
          invoiceId={invoiceId}
        />
      )}
    </Fragment>
  );
};

export default InvoiceDetailsPage;
