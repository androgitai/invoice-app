import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './InvoiceFormModal.module.css';
import arrowLeftSVG from '../../../assets/icon-arrow-left.svg';
import InvoiceForm from '../../Invoices/InvoiceForm/InvoiceForm';
import Wrapper from '../Layout/Wrapper';
import Backdrop from './Backdrop';
import useMediaQuery from '../../../hooks/use-media-query';

const ModalOverlay = props => {
  const isTablet = useMediaQuery('(min-width:768px)');
  const isNewForm = props.isNewForm;

  const formLabel = isNewForm ? (
    'New Invoice'
  ) : (
    <Fragment>
      {'Edit '}
      <span>#</span>
      {props.invoiceId}
    </Fragment>
  );

  return (
    <section className={classes.formModal}>
      <Wrapper wrapType='form'>
        {!isTablet && (
          <div onClick={props.onCancel} className={classes.backBtn}>
            <img className={classes.backButtonImg} src={arrowLeftSVG} alt='Back' />
            <h4 className={classes.backButtonH4}>Go back</h4>
          </div>
        )}
        <h1>{formLabel}</h1>
      </Wrapper>
      <InvoiceForm isNewForm={isNewForm} onCancel={props.onCancel} />
    </section>
  );
};

const InvoiceFormModal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onCancel} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          isNewForm={props.isNewForm}
          onCancel={props.onCancel}
          invoiceId={props.invoiceId}
        />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default InvoiceFormModal;
