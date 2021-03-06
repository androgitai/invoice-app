import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../UI/Elements/Button';
import plusIcon from '../../assets/icon-plus.svg';
import classes from './InvoicesHead.module.css';
import downArrowSVG from '../../assets/icon-arrow-down.svg';
import Filter from '../UI/Elements/Filter';
import useMediaQuery from '../../hooks/use-media-query';
import InvoiceFormModal from '../UI/Modals/InvoiceFormModal';

const InvoicesHead = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const totalInvoices = useSelector(state => state.invoices.totalInvoices);
  const isTablet = useMediaQuery('(min-width: 768px)');

  const toggleFilterHandler = () => {
    setFilterOpen(prevState => !prevState);
  };

  const toggleInvoiceFormHandler = () => {
    setIsInvoiceModalOpen(prevState => !prevState);
  };

  return (
    <Fragment>
      {isInvoiceModalOpen && (
        <InvoiceFormModal isNewForm={true} onCancel={toggleInvoiceFormHandler} />
      )}
      <section className={classes.invoicesheader}>
        <div>
          <h1>Invoices</h1>
          {isTablet ? (
            <p>There are {totalInvoices} total invoices</p>
          ) : (
            <p>{totalInvoices} invoices</p>
          )}
        </div>
        <div className={classes.control}>
          <div className={classes.filterControl}>
            <h4 onClick={toggleFilterHandler}>
              Filter <img src={downArrowSVG} alt='Filter' />
            </h4>
            {filterOpen && <Filter />}
          </div>
          <Button btnType='primary-img' onClick={toggleInvoiceFormHandler}>
            {<img src={plusIcon} alt='New Invoice'></img>}
            New {isTablet && 'Invoice'}
          </Button>
        </div>
      </section>
    </Fragment>
  );
};

export default InvoicesHead;
