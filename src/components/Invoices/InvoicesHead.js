import Button from '../UI/Button';
import plusIcon from '../../assets/icon-plus.svg';
import classes from './InvoicesHead.module.css';

const InvoicesHead = () => {
  return (
    <section className={classes.invoiceshead}>
      <div>
        <h1>Invoices</h1>
        <p>{7} Invoices</p>
      </div>
      <div className={classes.control}>
        <h4>Filter</h4>
        <div>
          <Button btnType='primary'>
            {<img src={plusIcon} alt='New Invoice'></img>} New
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InvoicesHead;
