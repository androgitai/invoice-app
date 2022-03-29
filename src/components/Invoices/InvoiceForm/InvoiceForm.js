import Button from '../../UI/Elements/Button';
import Form from './Form';
import FormItem from './FormItem';
import InvoiceFieldset from './InvoiceFieldset';
import InvoiceFormList from './InvoiceFormList';
import Wrapper from '../../UI/Layout/Wrapper';
import classes from './InvoiceForm.module.css';

const InvoiceForm = () => {
  const formSubmitHandler = event => {
    event.preventDefault();
    console.log('Submitted...');
  };

  return (
    <Form onSubmit={formSubmitHandler}>
      <Wrapper>
        <InvoiceFieldset fieldName='Bill From' gridAreas={classes.billFrom}>
          <FormItem type='text' name='Street Address' id='senderAddresStreet' />
          <FormItem type='text' name='City' id='senderAddressCity' />
          <FormItem type='text' name='Post Code' id='senderAddressPostcode' />
          <FormItem type='text' name='Country' id='senderAddressCountry' />
        </InvoiceFieldset>
        <InvoiceFieldset fieldName='Bill To' gridAreas={classes.billTo}>
          <FormItem type='text' name={`Client's Name`} id='clientName' />
          <FormItem type='email' name={`Client's Email`} id='clientEmail' />
          <FormItem type='text' name='Street Address' id='clientAddresStreet' />
          <FormItem type='text' name='City' id='clientAddressCity' />
          <FormItem type='text' name='Post Code' id='clientAddressPostcode' />
          <FormItem type='text' name='Country' id='clientAddressCountry' />
        </InvoiceFieldset>
        <InvoiceFieldset gridAreas={classes.terms}>
          <FormItem type='date' name='Invoice Date' />
          <FormItem type='select' />
          <FormItem type='text' name='Project Description' />
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
