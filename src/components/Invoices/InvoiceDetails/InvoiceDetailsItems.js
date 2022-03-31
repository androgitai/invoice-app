import Card from '../../UI/Layout/Card';
import { Fragment } from 'react';
import InvoiceDetailsItem from './InvoiceDetailsItem';
import useMediaQuery from '../../../hooks/use-media-query';
import InvoiceDetailsItemsHead from './InvoiceDetailsItemsHead';

const InvoiceDetailsItems = () => {
  const isTablet = useMediaQuery('(min-width:768px)');

  return (
    <Fragment>
      <Card cardType={isTablet ? 'itemsListTopLG' : 'itemsListTopSM'}>
        {isTablet && <InvoiceDetailsItemsHead />}
        <InvoiceDetailsItem />
        <InvoiceDetailsItem />
      </Card>
      <Card cardType='itemsTotal'>
        {isTablet ? <p>Amount Due</p> : <p>Grand Total</p>}
        <h2>£ 556.00</h2>
      </Card>
    </Fragment>
  );
};

export default InvoiceDetailsItems;
