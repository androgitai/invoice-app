import { Fragment, useState } from 'react';

import InvoiceFormListItem from './InvoiceFormListItem';
import Button from '../../../UI/Elements/Button';
import InvoiceFieldset from '../Layout/InvoiceFieldset';
import classes from './InvoiceFormList.module.css';

const InvoiceFormList = props => {
  const [listItems, setListItems] = useState(props.items);
  console.log(listItems);
  const emptyItem = {
    name: 'dsadsa',
    quantity: 10,
    price: 100,
    total: 100,
  };

  const addNewListItemHandler = () => {
    setListItems(prevListItems => [...prevListItems, emptyItem]);
  };

  const removeListItemHandler = indexId => {
    setListItems(prevListItems => {
      const filteredList = prevListItems.filter((item, index) => {
        return index !== indexId;
      });
      return filteredList;
    });
  };

  return (
    <Fragment>
      <InvoiceFieldset
        fieldName='Item List'
        legendStyle={classes.header}
        gridType='itemList'
      >
        {listItems.map((item, index) => {
          console.log(item);
          return (
            <InvoiceFormListItem
              key={index}
              id={index}
              item={item}
              onDelete={removeListItemHandler}
            />
          );
        })}
      </InvoiceFieldset>
      <Button btnType='form' onClick={addNewListItemHandler}>
        +Add New Item
      </Button>
    </Fragment>
  );
};

export default InvoiceFormList;
