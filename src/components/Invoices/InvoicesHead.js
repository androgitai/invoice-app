import Button from '../UI/Elements/Button';
import plusIcon from '../../assets/icon-plus.svg';
import classes from './InvoicesHead.module.css';

const InvoicesHead = () => {
  return (
    <section className={classes.invoicesheader}>
      <div>
        <h1>Invoices</h1>
        <p className={classes.totalInvoices}>{7} Invoices</p>
      </div>
      <div className={classes.control}>
        <h4>Filter</h4>
        <Button btnType='primary-img'>
          {<img src={plusIcon} alt='New Invoice'></img>}New
        </Button>
      </div>
    </section>
  );
};

export default InvoicesHead;
