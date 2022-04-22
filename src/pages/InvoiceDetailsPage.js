import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoice } from '../store/invoices-http-actions';

import useMediaQuery from '../hooks/use-media-query';

import Wrapper from '../components/UI/Layout/Wrapper';
import InvoiceDetailsHead from '../components/Invoices/InvoiceDetails/InvoiceDetailsHead';
import InvoiceDetailsBody from '../components/Invoices/InvoiceDetails/InvoiceDetailsBody';
import InvoiceDetailsControl from '../components/Invoices/InvoiceDetails/InvoiceDetailsControl';
import ConfirmModal from '../components/UI/Modals/ConfirmModal';
import InvoiceFormModal from '../components/UI/Modals/InvoiceFormModal';
import NotFound from '../components/UI/Elements/NotFound';
import Spinner from '../components/UI/Elements/Spinner';

const InvoiceDetailsPage = () => {
  const isTablet = useMediaQuery('(min-width:768px)');
  const dispatch = useDispatch();
  const { currentInvoice, currentInvoiceId } = useSelector(state => state.invoices);
  const { invoiceIdFromRoute } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoading = useSelector(state => state.ui.isLoading);

  useEffect(() => {
    dispatch(fetchInvoice(invoiceIdFromRoute));
  }, [dispatch, invoiceIdFromRoute]);

  const toggleInvoiceFormHandler = () => {
    setIsFormOpen(prevState => !prevState);
  };
  const toggleDeleteModalHandler = () => {
    setIsModalOpen(prevState => !prevState);
  };

  if (!currentInvoice) {
    return <NotFound />;
  }
  return (
    <Fragment>
      {isLoading && <Spinner />}
      {isFormOpen && (
        <InvoiceFormModal
          isNewForm={false}
          invoiceId={currentInvoice.id}
          onCancel={toggleInvoiceFormHandler}
        />
      )}
      <Wrapper>
        {isModalOpen && (
          <ConfirmModal
            invoiceId={currentInvoice.id}
            invoiceServerId={currentInvoiceId}
            onClose={toggleDeleteModalHandler}
          />
        )}
        <InvoiceDetailsHead
          toggleForm={toggleInvoiceFormHandler}
          toggleModal={toggleDeleteModalHandler}
          status={currentInvoice.status}
        />
        <InvoiceDetailsBody />
      </Wrapper>
      {!isTablet && (
        <InvoiceDetailsControl
          toggleForm={toggleInvoiceFormHandler}
          toggleModal={toggleDeleteModalHandler}
        />
      )}
    </Fragment>
  );
};

export default InvoiceDetailsPage;
