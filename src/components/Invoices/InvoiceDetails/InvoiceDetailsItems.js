import Card from '../../UI/Layout/Card';
import { Fragment } from 'react';
import InvoiceDetailsItem from './InvoiceDetailsItem';

const InvoiceDetailsItems = () => {
  return (
    <Fragment>
      <Card cardType='itemsListTop'>
        <InvoiceDetailsItem />
        <InvoiceDetailsItem />
      </Card>
      <Card cardType='itemsListBottom'>
        <p>Grand Total</p>
        <h2>£ 556.00</h2>
      </Card>
    </Fragment>
  );
};

export default InvoiceDetailsItems;
