import Button from '../../UI/Elements/Button';
import Form from './Layout/Form';
import InvoiceFormItem from './InvoiceFormItem';
import InvoiceFieldset from './Layout/InvoiceFieldset';
import InvoiceFormList from './ItemList/InvoiceFormList';
import Wrapper from '../../UI/Layout/Wrapper';
import classes from './InvoiceForm.module.css';

const InvoiceForm = () => {
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
          />
          <InvoiceFormItem type='text' name='City' id='senderAddressCity' />
          <InvoiceFormItem
            type='text'
            name='Post Code'
            id='senderAddressPostcode'
          />
          <InvoiceFormItem
            type='text'
            name='Country'
            id='senderAddressCountry'
          />
        </InvoiceFieldset>
        <InvoiceFieldset fieldName='Bill To' gridAreas={classes.billTo}>
          <InvoiceFormItem type='text' name={`Client's Name`} id='clientName' />
          <InvoiceFormItem
            type='email'
            name={`Client's Email`}
            id='clientEmail'
          />
          <InvoiceFormItem
            type='text'
            name='Street Address'
            id='clientAddresStreet'
          />
          <InvoiceFormItem type='text' name='City' id='clientAddressCity' />
          <InvoiceFormItem
            type='text'
            name='Post Code'
            id='clientAddressPostcode'
          />
          <InvoiceFormItem
            type='text'
            name='Country'
            id='clientAddressCountry'
          />
        </InvoiceFieldset>
        <InvoiceFieldset gridAreas={classes.terms}>
          <InvoiceFormItem type='date' name='Invoice Date' />
          <InvoiceFormItem type='select' />
          <InvoiceFormItem
            type='text'
            name='Project Description'
            defVal='e.g. Graphic Design Service'
          />
        </InvoiceFieldset>
        <InvoiceFormList gridAreas={classes.itemList} />
      </Wrapper>
      <div className={classes.controls}>
        <Button btnType='discard' type='submit'>
          Discard
        </Button>
        <Button btnType='draft' type='submit'>
          Save as Draft
        </Button>
        <Button btnType='primary' type='submit'>
          {`Save & Send`}
        </Button>
      </div>
    </Form>
  );
};

export default InvoiceForm;
