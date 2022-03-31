import { Fragment } from 'react';
import useMediaQuery from '../../../hooks/use-media-query';

const InvoiceDetailsItem = () => {
  const isTablet = useMediaQuery('(min-width:768px)');

  const contentSM = (
    <Fragment>
      <div>
        <h4>Banner Design</h4>
        <p>{1} x £156.00</p>
      </div>
      <h4>£ 156.00</h4>
    </Fragment>
  );

  const contentLG = (
    <Fragment>
      <h4>Banner Design</h4>
      <p className='bold'>{1} x </p>
      <p className='bold'>£156.00</p>
      <h6>£ 156.00</h6>
    </Fragment>
  );

  return <Fragment>{isTablet ? contentLG : contentSM}</Fragment>;
};

export default InvoiceDetailsItem;
