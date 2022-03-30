import classes from './NoInvoices.module.css';
import emptySVG from '../../../assets/illustration-empty.svg';

const NoInvoices = () => {
  return (
    <div className={classes.empty}>
      <img src={emptySVG} alt='No Invoices' />
      <h2>There is nothing here</h2>
      <div>
        <p>Create an invoice by clicking the</p>
        <p>
          <span>New</span> button and get started
        </p>
      </div>
    </div>
  );
};

export default NoInvoices;
