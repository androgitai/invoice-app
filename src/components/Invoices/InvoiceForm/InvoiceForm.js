import Button from '../../UI/Elements/Button';
import Form from './Layout/Form';
import InvoiceFormItem from './InvoiceFormItem';
import InvoiceFieldset from './Layout/InvoiceFieldset';
import InvoiceFormList from './ItemList/InvoiceFormList';
import Wrapper from '../../UI/Layout/Wrapper';
import classes from './InvoiceForm.module.css';
import { useSelector } from 'react-redux';

const InvoiceForm = props => {
  const { currentInvoice, emptyFormTemplate } = useSelector(
    state => state.invoices
  );
  const isNewForm = props.isNewForm;

  const formData = isNewForm ? emptyFormTemplate : currentInvoice;

  const formSubmitHandler = event => {
    event.preventDefault();
    console.log('Submitted...');
  };

  return (
    <Form onSubmit={formSubmitHandler}>
      <Wrapper wrapType='form'>
        <InvoiceFieldset fieldName='Bill From' gridAreas={classes.billFrom}>
          <InvoiceFormItem
            type='text'
            name='Street Address'
            id='senderAddresStreet'
            defVal={formData.senderAddress.street}
          />
          <InvoiceFormItem
            type='text'
            name='City'
            id='senderAddressCity'
            defVal={formData.senderAddress.city}
          />
          <InvoiceFormItem
            type='text'
            name='Post Code'
            id='senderAddressPostcode'
            defVal={formData.senderAddress.postCode}
          />
          <InvoiceFormItem
            type='text'
            name='Country'
            id='senderAddressCountry'
            defVal={formData.senderAddress.country}
          />
        </InvoiceFieldset>
        <InvoiceFieldset fieldName='Bill To' gridAreas={classes.billTo}>
          <InvoiceFormItem
            type='text'
            name={`Client's Name`}
            id='clientName'
            defVal={formData.clientName}
          />
          <InvoiceFormItem
            type='email'
            name={`Client's Email`}
            id='clientEmail'
            placeHold='e.g. email@example.com'
            defVal={formData.clientEmail}
          />
          <InvoiceFormItem
            type='text'
            name='Street Address'
            id='clientAddresStreet'
            defVal={formData.clientAddress.street}
          />
          <InvoiceFormItem
            type='text'
            name='City'
            id='clientAddressCity'
            defVal={formData.clientAddress.city}
          />
          <InvoiceFormItem
            type='text'
            name='Post Code'
            id='clientAddressPostcode'
            defVal={formData.clientAddress.postCode}
          />
          <InvoiceFormItem
            type='text'
            name='Country'
            id='clientAddressCountry'
            defVal={formData.clientAddress.country}
          />
        </InvoiceFieldset>
        <InvoiceFieldset gridAreas={classes.terms}>
          <InvoiceFormItem
            type='date'
            name='Invoice Date'
            defVal={formData.createdAt}
          />
          <InvoiceFormItem type='select' defVal={formData.paymentTerms} />
          <InvoiceFormItem
            type='text'
            name='Project Description'
            placeHold='e.g. Graphic Design Service'
            defVal={formData.description}
          />
        </InvoiceFieldset>
        <InvoiceFormList gridAreas={classes.itemList} items={formData.items} />
      </Wrapper>
      <div className={classes.controls}>
        <Button btnType='discard' type='button' onClick={props.onCancel}>
          {isNewForm ? 'Discard' : 'Cancel'}
        </Button>
        <Button btnType='draft' type='submit'>
          Save as Draft
        </Button>
        <Button btnType='primary' type='submit'>
          {'Save & Send'}
        </Button>
      </div>
    </Form>
  );
};

export default InvoiceForm;
