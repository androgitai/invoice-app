import { Fragment } from 'react';

import InvoiceFormListItem from './InvoiceFormListItem';
import Button from '../../../UI/Elements/Button';
import InvoiceFieldset from '../Layout/InvoiceFieldset';
import classes from './InvoiceFormList.module.css';

const InvoiceFormList = props => {
  const { items } = props;
  console.log(items);

  return (
    <Fragment>
      <InvoiceFieldset
        fieldName='Item List'
        legendStyle={classes.header}
        gridType='itemList'
      >
        {items.map(item => (
          <InvoiceFormListItem
            key={item.name}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            total={item.total}
          />
        ))}
      </InvoiceFieldset>
      <Button btnType='form'>+Add New Item</Button>
    </Fragment>
  );
};

export default InvoiceFormList;
