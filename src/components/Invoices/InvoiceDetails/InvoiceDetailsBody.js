import { useSelector } from 'react-redux';

import classes from './InvoiceDetailsBody.module.css';
import Card from '../../UI/Layout/Card';
import InvoiceDetailsItems from './InvoiceDetailsItems';

const InvoiceDetailsBody = () => {
  const currentInvoice = useSelector(state => state.invoices.currentInvoice);

  return (
    <Card cardType='grid-invoiceDetails'>
      <div className={classes.griditem1}>
        <h4>
          <span>#</span>
          {currentInvoice.id}
        </h4>
        <p>{currentInvoice.description}</p>
      </div>
      <div className={classes.griditem2}>
        <span>
          <p>{currentInvoice.senderAddress.street}</p>
          <p>{currentInvoice.senderAddress.city}</p>
          <p>{currentInvoice.senderAddress.postCode}</p>
          <p>{currentInvoice.senderAddress.country}</p>
        </span>
      </div>
      <div className={classes.griditem3}>
        <p>Invoice Date</p>
        <h5>{currentInvoice.createdAt}</h5>
      </div>
      <div className={classes.griditem4}>
        <p>Payment Due</p>
        <h5>{currentInvoice.paymentDue}</h5>
      </div>
      <div className={classes.griditem5}>
        <p>Bill To</p>
        <h5>{currentInvoice.clientName}</h5>
        <span>
          <p>{currentInvoice.clientAddress.street}</p>
          <p>{currentInvoice.clientAddress.city}</p>
          <p>{currentInvoice.clientAddress.postCode}</p>
          <p>{currentInvoice.clientAddress.country}</p>
        </span>
      </div>
      <div className={classes.griditem6}>
        <p>Sent to</p>
        <h5>{currentInvoice.clientEmail}</h5>
      </div>
      <div className={classes.griditem7}>
        <InvoiceDetailsItems />
      </div>
    </Card>
  );
};

export default InvoiceDetailsBody;
