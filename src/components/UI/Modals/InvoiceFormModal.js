import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import classes from './InvoiceFormModal.module.css';
import arrowLeftSVG from '../../../assets/icon-arrow-left.svg';
import InvoiceForm from '../../Invoices/InvoiceForm/InvoiceForm';
import Wrapper from '../Layout/Wrapper';
import Backdrop from './Backdrop';
import useMediaQuery from '../../../hooks/use-media-query';

const ModalOverlay = props => {
  const isTablet = useMediaQuery('(min-width:768px)');

  return (
    <section className={classes.formModal}>
      <Wrapper wrapType='form'>
        {!isTablet && (
          <div onClick={props.onClose}>
            <img
              className={classes.backButtonImg}
              src={arrowLeftSVG}
              alt='Back'
            />
            <h4 className={classes.backButtonH4}>Go back</h4>
          </div>
        )}
        <h1>Edit #XM9141</h1>
      </Wrapper>
      <InvoiceForm />
    </section>
  );
};

const InvoiceFormModal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay invoiceId={props.invoiceId} onClose={props.onClose} />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default InvoiceFormModal;
