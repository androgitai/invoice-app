import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './InvoiceDetailsHead.module.css';
import arrowLeftSVG from '../../../assets/icon-arrow-left.svg';
import Card from '../../UI/Layout/Card';
import StatusPill from '../../UI/Elements/StatusPill';
import InvoiceDetailsControl from './InvoiceDetailsControl';
import useMediaQuery from '../../../hooks/use-media-query';

const InvoiceDetailsHead = props => {
  const isTablet = useMediaQuery('(min-width:768px)');

  return (
    <Fragment>
      <Link className={classes.details} to='/'>
        <img className={classes.detailsHeadImg} src={arrowLeftSVG} alt='Back' />
        <h4 className={classes.detailsHeadH4}>Go back</h4>
      </Link>
      <Card cardType='flex'>
        <p>Status</p>
        <StatusPill status={props.status} />
        {isTablet && (
          <InvoiceDetailsControl
            toggleForm={props.toggleForm}
            toggleModal={props.toggleModal}
            position='top'
            status={props.status}
            invoiceId={props.invoiceId}
          />
        )}
      </Card>
    </Fragment>
  );
};

export default InvoiceDetailsHead;
