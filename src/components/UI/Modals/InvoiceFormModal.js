import { Link } from 'react-router-dom';
import classes from './InvoiceFormModal.module.css';
import arrowLeftSVG from '../../../assets/icon-arrow-left.svg';
import InvoiceForm from '../../Invoices/InvoiceForm/InvoiceForm';
import Wrapper from '../Layout/Wrapper';

const InvoiceFormModal = () => {
  return (
    <section className={classes.formModal}>
      <Wrapper>
        <Link to='/'>
          <img
            className={classes.backButtonImg}
            src={arrowLeftSVG}
            alt='Back'
          />
          <h4 className={classes.backButtonH4}>Go back</h4>
        </Link>
        <h1>Edit #XM9141</h1>
      </Wrapper>
      <InvoiceForm />
    </section>
  );
};

export default InvoiceFormModal;
