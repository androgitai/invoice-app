import classes from './InvoiceItem.module.css';
import Card from '../UI/Layout/Card';
import StatusPill from '../UI/Elements/StatusPill';
import arrowRightSVG from '../../assets/icon-arrow-right.svg';
import useMediaQuery from '../../hooks/use-media-query';

const InvoiceItem = props => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const { invoiceId, paymentDue, clientName, total, status } = props;

  return (
    <div onClick={props.onClick}>
      <Card cardType='grid-invoiceList'>
        <h4 className={classes.item1}>
          <span>#</span>
          {invoiceId}
        </h4>
        <p className={classes.item2}>{clientName}</p>

        <p className={classes.item3}>
          <span>Due</span> {paymentDue}
        </p>
        <h3 className={classes.item4}>£{total.toFixed(2)}</h3>

        <div className={classes.item5}>
          <StatusPill status={status} />
        </div>
        {isTablet && (
          <img
            className={classes.item6}
            src={arrowRightSVG}
            alt='Invoice Details'
          />
        )}
      </Card>
    </div>
  );
};

export default InvoiceItem;
