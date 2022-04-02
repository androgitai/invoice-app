import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Card from '../../../UI/Layout/Card';
import InvoiceDetailsItem from './InvoiceDetailsItem';
import useMediaQuery from '../../../../hooks/use-media-query';
import InvoiceDetailsItemsHead from './InvoiceDetailsItemsHead';

const InvoiceDetailsItems = () => {
  const currentInvoiceItems = useSelector(
    state => state.invoices.currentInvoice.items
  );
  const isTablet = useMediaQuery('(min-width:768px)');

  return (
    <Fragment>
      <Card cardType={isTablet ? 'itemsListTopLG' : 'itemsListTopSM'}>
        {isTablet && <InvoiceDetailsItemsHead />}
        {currentInvoiceItems.map(item => (
          <InvoiceDetailsItem
            key={item.name}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            total={item.total}
          />
        ))}
      </Card>
      <Card cardType='itemsTotal'>
        {isTablet ? <p>Amount Due</p> : <p>Grand Total</p>}
        <h2>£ 556.00</h2>
      </Card>
    </Fragment>
  );
};

export default InvoiceDetailsItems;
