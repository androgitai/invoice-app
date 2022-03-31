import { Fragment } from 'react';

import InvoiceFormListItem from './InvoiceFormListItem';
import Button from '../../UI/Elements/Button';
import InvoiceFieldset from './InvoiceFieldset';
import classes from './InvoiceFormList.module.css';

const InvoiceFormList = props => {
  return (
    <Fragment>
      <InvoiceFieldset
        fieldName='Item List'
        legendStyle={classes.header}
        gridAreas={props.gridAreas}
      >
        <InvoiceFormListItem />
      </InvoiceFieldset>
      <Button btnType='form'>+Add New Item</Button>
    </Fragment>
  );
};

export default InvoiceFormList;
