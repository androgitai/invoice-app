import classes from './InvoiceItem.module.css';
import Card from '../UI/Layout/Card';
import StatusPill from '../UI/Elements/StatusPill';

const InvoiceItem = props => {
  return (
    <Card>
      <h4 className={classes.item1}>
        <span>#</span>RT3080
      </h4>
      <p className={classes.item2}>Jensen Huang</p>
      <div className={classes.item3}>
        <p>
          <span>Due</span> 19 Aug 2021
        </p>
        <h3>£1,800.90</h3>
      </div>
      <StatusPill status='Paid' />
    </Card>
  );
};

export default InvoiceItem;
