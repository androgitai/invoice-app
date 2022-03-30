import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './InvoiceDetailsHead.module.css';
import arrowLeftSVG from '../../../assets/icon-arrow-left.svg';
import Card from '../../UI/Layout/Card';
import StatusPill from '../../UI/Elements/StatusPill';
import InvoiceDetailsControl from './InvoiceDetailsControl';

const InvoiceDetailsHead = () => {
  return (
    <Fragment>
      <Link to='/'>
        <img className={classes.detailsHeadImg} src={arrowLeftSVG} alt='Back' />
        <h4 className={classes.detailsHeadH4}>Go back</h4>
      </Link>
      <Card cardType='flex'>
        <p>Status</p>
        <StatusPill status='Pending' />
        <InvoiceDetailsControl visible='top' />
      </Card>
    </Fragment>
  );
};

export default InvoiceDetailsHead;
