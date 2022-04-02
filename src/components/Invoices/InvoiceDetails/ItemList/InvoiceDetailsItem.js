import { Fragment } from 'react';
import useMediaQuery from '../../../../hooks/use-media-query';

const InvoiceDetailsItem = props => {
  const { name, quantity, price, total } = props;
  const isTablet = useMediaQuery('(min-width:768px)');

  const contentSM = (
    <Fragment>
      <div>
        <h4>{name}</h4>
        <p>
          {quantity} x £{price.toFixed(2)}
        </p>
      </div>
      <h4>£{total.toFixed(2)}</h4>
    </Fragment>
  );

  const contentLG = (
    <Fragment>
      <h4>{name}</h4>
      <p className='bold'>{quantity} x </p>
      <p className='bold'>£{price.toFixed(2)}</p>
      <h6>£{total.toFixed(2)}</h6>
    </Fragment>
  );

  return <Fragment>{isTablet ? contentLG : contentSM}</Fragment>;
};

export default InvoiceDetailsItem;
