import { useSelector, useDispatch } from 'react-redux';
import { invoicesActions } from '../../../store/invoices-slice';
import useFormListItems from '../../../hooks/use-form-item-list';

import Button from '../../UI/Elements/Button';
import Form from './Layout/Form';
import InvoiceFormItem from './InvoiceFormItem';
import InvoiceFieldset from './Layout/InvoiceFieldset';
import InvoiceFormList from './ItemList/InvoiceFormList';
import Wrapper from '../../UI/Layout/Wrapper';
import classes from './InvoiceForm.module.css';

const InvoiceForm = props => {
  const dispatch = useDispatch();
  const { currentInvoice, emptyFormTemplate } = useSelector(
    state => state.invoices
  );
  const { listItemsState, dispatchListItem } = useFormListItems(
    currentInvoice.items
  );

  const isNewForm = props.isNewForm;
  const formData = isNewForm ? emptyFormTemplate : currentInvoice;

  const formSubmitHandler = event => {
    event.preventDefault();
    if (event.nativeEvent.submitter.name === 'draft') {
      const formData = new FormData(event.target);
      const submittedData = Object.fromEntries(formData.entries());
      const id = isNewForm ? 'new' : currentInvoice.id;
      dispatch(
        invoicesActions.saveAsDraftInvoice({
          submittedData,
          listItemsState,
          id,
        })
      );
      console.log('Submitted...');
      props.onCancel();
    }
  };

  return (
    <Form onSubmit={formSubmitHandler}>
      <Wrapper wrapType='form'>
        <InvoiceFieldset fieldName='Bill From' gridType='billFrom'>
          <InvoiceFormItem
            type='text'
            name='Street Address'
            id='senderAddressStreet'
            defVal={formData.senderAddress.street}
            gridArea='gridArea1'
          />
          <InvoiceFormItem
            type='text'
            name='City'
            id='senderAddressCity'
            defVal={formData.senderAddress.city}
            gridArea='gridArea2'
          />
          <InvoiceFormItem
            type='text'
            name='Post Code'
            id='senderAddressPostcode'
            defVal={formData.senderAddress.postCode}
            gridArea='gridArea3'
          />
          <InvoiceFormItem
            type='text'
            name='Country'
            id='senderAddressCountry'
            defVal={formData.senderAddress.country}
            gridArea='gridArea4'
          />
        </InvoiceFieldset>
        <InvoiceFieldset fieldName='Bill To' gridType='billTo'>
          <InvoiceFormItem
            type='text'
            name={`Client's Name`}
            id='clientName'
            defVal={formData.clientName}
            gridArea='gridArea1'
          />
          <InvoiceFormItem
            type='email'
            name={`Client's Email`}
            id='clientEmail'
            placeHold='e.g. email@example.com'
            defVal={formData.clientEmail}
            gridArea='gridArea2'
          />
          <InvoiceFormItem
            type='text'
            name='Street Address'
            id='clientAddressStreet'
            defVal={formData.clientAddress.street}
            gridArea='gridArea3'
          />
          <InvoiceFormItem
            type='text'
            name='City'
            id='clientAddressCity'
            defVal={formData.clientAddress.city}
            gridArea='gridArea4'
          />
          <InvoiceFormItem
            type='text'
            name='Post Code'
            id='clientAddressPostcode'
            defVal={formData.clientAddress.postCode}
            gridArea='gridArea5'
          />
          <InvoiceFormItem
            type='text'
            name='Country'
            id='clientAddressCountry'
            defVal={formData.clientAddress.country}
            gridArea='gridArea6'
          />
        </InvoiceFieldset>
        <InvoiceFieldset gridType='terms'>
          <InvoiceFormItem
            type='date'
            name='Invoice Date'
            id='createdAt'
            defVal={formData.createdAt}
            gridArea='gridArea1'
          />
          <InvoiceFormItem
            type='select'
            defVal={formData.paymentTerms}
            gridArea='gridArea2'
          />
          <InvoiceFormItem
            type='text'
            name='Project Description'
            id='description'
            placeHold='e.g. Graphic Design Service'
            defVal={formData.description}
            gridArea='gridArea3'
          />
        </InvoiceFieldset>
        <InvoiceFormList
          gridAreas={classes.itemList}
          items={isNewForm ? formData.items : listItemsState}
          dispatchChange={dispatchListItem}
        />
      </Wrapper>
      <div className={classes.controls}>
        <Button btnType='discard' type='button' onClick={props.onCancel}>
          {isNewForm ? 'Discard' : 'Cancel'}
        </Button>
        <Button btnType='draft' type='submit' name='draft'>
          Save as Draft
        </Button>
        <Button btnType='primary' type='submit' name='send'>
          {'Save & Send'}
        </Button>
      </div>
    </Form>
  );
};

export default InvoiceForm;
