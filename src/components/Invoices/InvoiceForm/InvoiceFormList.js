import { Fragment } from 'react';

import InvoiceFormListItem from './InvoiceFormListItem';
import Button from '../../UI/Elements/Button';
import InvoiceFieldset from './InvoiceFieldset';

const InvoiceFormList = props => {
  return (
    <Fragment>
      <InvoiceFieldset gridAreas={props.gridAreas}>
        <InvoiceFormListItem />
      </InvoiceFieldset>
      <Button btnType='form'>+Add New Item</Button>
    </Fragment>
  );
};

export default InvoiceFormList;
