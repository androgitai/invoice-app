import { useParams } from 'react-router-dom';

import classes from './InvoiceDetailsBody.module.css';
import Card from '../../UI/Layout/Card';
import InvoiceDetailsItems from './InvoiceDetailsItems';

const InvoiceDetailsBody = () => {
  const { invoiceId } = useParams();

  return (
    <Card cardType='grid-invoiceDetails'>
      <div className={classes.griditem1}>
        <h4>
          <span>#</span>
          {/* {invoiceId} */}
          XM9191
        </h4>
        <p>Graphic Design</p>
      </div>
      <div className={classes.griditem2}>
        <span>
          <p>19 Union Terrace</p>
          <p>London</p>
          <p>E1 3EZ</p>
          <p>United Kingdom</p>
        </span>
      </div>
      <div className={classes.griditem3}>
        <p>Invoice Date</p>
        <h5>21 Aug 2021</h5>
      </div>
      <div className={classes.griditem4}>
        <p>Payment Due</p>
        <h5>20 Sep 2021</h5>
      </div>
      <div className={classes.griditem5}>
        <p>Bill To</p>
        <h5>Alex Grim</h5>
        <span>
          <p>84 Church Way</p>
          <p>Bradford</p>
          <p>BD1 9PB</p>
          <p>United Kingdom</p>
        </span>
      </div>
      <div className={classes.griditem6}>
        <p>Sent to</p>
        <h5>alexgrim@mail.com</h5>
      </div>
      <div className={classes.griditem7}>
        <InvoiceDetailsItems />
      </div>
    </Card>
  );
};

export default InvoiceDetailsBody;
