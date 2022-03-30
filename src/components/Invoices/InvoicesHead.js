import { useState } from 'react';
import Button from '../UI/Elements/Button';
import plusIcon from '../../assets/icon-plus.svg';
import classes from './InvoicesHead.module.css';
import downArrowSVG from '../../assets/icon-arrow-down.svg';
import Filter from '../UI/Elements/Filter';

const InvoicesHead = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilterHandler = () => {
    setFilterOpen(prevState => !prevState);
  };

  return (
    <section className={classes.invoicesheader}>
      <div>
        <h1>Invoices</h1>
        <p className={classes.totalInvoicesSM}>{7} Invoices</p>
        <p className={classes.totalInvoicesLG}>There are {7} total invoices</p>
      </div>
      <div className={classes.control}>
        <div className={classes.filterControl}>
          <h4 onClick={toggleFilterHandler}>
            Filter <img src={downArrowSVG} alt='Filter' />
          </h4>
          {filterOpen && <Filter />}
        </div>
        <Button btnType='primary-img'>
          {<img src={plusIcon} alt='New Invoice'></img>}
          New <span>Invoice</span>
        </Button>
      </div>
    </section>
  );
};

export default InvoicesHead;
