import { useState } from 'react';
import Button from '../UI/Elements/Button';
import plusIcon from '../../assets/icon-plus.svg';
import classes from './InvoicesHead.module.css';
import downArrowSVG from '../../assets/icon-arrow-down.svg';
import Filter from '../UI/Elements/Filter';
import useMediaQuery from '../../hooks/use-media-query';

const InvoicesHead = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const isTablet = useMediaQuery('(min-width: 768px)');

  const toggleFilterHandler = () => {
    setFilterOpen(prevState => !prevState);
  };

  return (
    <section className={classes.invoicesheader}>
      <div>
        <h1>Invoices</h1>
        {isTablet ? <p>There are {7} total invoices</p> : <p>{7} invoices</p>}
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
          New {isTablet && 'Invoice'}
        </Button>
      </div>
    </section>
  );
};

export default InvoicesHead;
