import classes from './InvoiceItem.module.css';
import Card from '../UI/Layout/Card';
import StatusPill from '../UI/Elements/StatusPill';
import arrowRightSVG from '../../assets/icon-arrow-right.svg';
import useMediaQuery from '../../hooks/use-media-query';

const InvoiceItem = props => {
  const isTablet = useMediaQuery('(min-width: 768px)');

  return (
    <Card cardType='grid-invoiceList'>
      <h4 className={classes.item1}>
        <span>#</span>RT3080
      </h4>
      <p className={classes.item2}>Jensen Huang</p>

      <p className={classes.item3}>
        <span>Due</span> 19 Aug 2021
      </p>
      <h3 className={classes.item4}>£1,800.90</h3>

      <div className={classes.item5}>
        <StatusPill status='Paid' />
      </div>
      {isTablet && (
        <img
          className={classes.item6}
          src={arrowRightSVG}
          alt='Invoice Details'
        />
      )}
    </Card>
  );
};

export default InvoiceItem;
