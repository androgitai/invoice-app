import { useSelector, useDispatch } from 'react-redux';
import { invoicesActions } from '../../../store/invoices-slice';
import useForm from '../../../hooks/use-form';

import Button from '../../UI/Elements/Button';
import Form from './Layout/Form';
import InvoiceFormItem from './InvoiceFormItem';
import InvoiceFieldset from './Layout/InvoiceFieldset';
import InvoiceFormList from './ItemList/InvoiceFormList';
import Wrapper from '../../UI/Layout/Wrapper';
import classes from './InvoiceForm.module.css';

const InvoiceForm = props => {
  const isNewForm = props.isNewForm;

  const dispatch = useDispatch();
  const { currentInvoice, emptyFormTemplate } = useSelector(state => state.invoices);

  const { formState, dispatchFormChange } = useForm(isNewForm ? emptyFormTemplate : currentInvoice);
  console.log(formState);

  const formSubmitHandler = event => {
    event.preventDefault();
    const id = isNewForm ? 'new' : currentInvoice.id;
    const submitType = event.nativeEvent.submitter.name;
    dispatch(
      invoicesActions.submittedInvoiceHandler({
        formState,
        id,
        submitType,
      })
    );
    props.onCancel();
  };

  return (
    <Form onSubmit={formSubmitHandler}>
      <Wrapper wrapType='form'>
        <InvoiceFieldset fieldName='Bill From' gridType='billFrom'>
          <InvoiceFormItem
            type='text'
            name='Street Address'
            id='senderAddress.street'
            defVal={formState.senderAddress.street}
            gridArea='gridArea1'
            dispatchChange={dispatchFormChange}
          />
          <InvoiceFormItem
            type='text'
            name='City'
            id='senderAddress.city'
            defVal={formState.senderAddress.city}
            gridArea='gridArea2'
            dispatchChange={dispatchFormChange}
          />
          <InvoiceFormItem
            type='text'
            name='Post Code'
            id='senderAddress.postCode'
            defVal={formState.senderAddress.postCode}
            gridArea='gridArea3'
            dispatchChange={dispatchFormChange}
          />
          <InvoiceFormItem
            type='text'
            name='Country'
            id='senderAddress.country'
            defVal={formState.senderAddress.country}
            gridArea='gridArea4'
            dispatchChange={dispatchFormChange}
          />
        </InvoiceFieldset>
        <InvoiceFieldset fieldName='Bill To' gridType='billTo'>
          <InvoiceFormItem
            type='text'
            name={`Client's Name`}
            id='clientName'
            defVal={formState.clientName}
            gridArea='gridArea1'
            dispatchChange={dispatchFormChange}
          />
          <InvoiceFormItem
            type='email'
            name={`Client's Email`}
            id='clientEmail'
            placeHold='e.g. email@example.com'
            defVal={formState.clientEmail}
            gridArea='gridArea2'
            dispatchChange={dispatchFormChange}
          />
          <InvoiceFormItem
            type='text'
            name='Street Address'
            id='clientAddress.street'
            defVal={formState.clientAddress.street}
            gridArea='gridArea3'
            dispatchChange={dispatchFormChange}
          />
          <InvoiceFormItem
            type='text'
            name='City'
            id='clientAddress.city'
            defVal={formState.clientAddress.city}
            gridArea='gridArea4'
            dispatchChange={dispatchFormChange}
          />
          <InvoiceFormItem
            type='text'
            name='Post Code'
            id='clientAddress.postCode'
            defVal={formState.clientAddress.postCode}
            gridArea='gridArea5'
            dispatchChange={dispatchFormChange}
          />
          <InvoiceFormItem
            type='text'
            name='Country'
            id='clientAddress.country'
            defVal={formState.clientAddress.country}
            gridArea='gridArea6'
            dispatchChange={dispatchFormChange}
          />
        </InvoiceFieldset>
        <InvoiceFieldset gridType='terms'>
          <InvoiceFormItem
            type='date'
            name='Invoice Date'
            id='createdAt'
            defVal={formState.createdAt}
            gridArea='gridArea1'
            dispatchChange={dispatchFormChange}
          />
          <InvoiceFormItem
            type='select'
            defVal={formState.paymentTerms}
            gridArea='gridArea2'
            dispatchChange={dispatchFormChange}
          />
          <InvoiceFormItem
            type='text'
            name='Project Description'
            id='description'
            placeHold='e.g. Graphic Design Service'
            defVal={formState.description}
            gridArea='gridArea3'
            dispatchChange={dispatchFormChange}
          />
        </InvoiceFieldset>
        <InvoiceFormList
          gridAreas={classes.itemList}
          items={formState.items}
          dispatchChange={dispatchFormChange}
        />
      </Wrapper>
      <div className={classes.controls}>
        <Button btnType='discard' type='button' onClick={props.onCancel}>
          {isNewForm ? 'Discard' : 'Cancel'}
        </Button>
        {(isNewForm || formState.status === 'draft') && (
          <Button btnType='draft' type='submit' name='draft'>
            Save as Draft
          </Button>
        )}
        <Button btnType='primary' type='submit' name='send'>
          {'Save & Send'}
        </Button>
      </div>
    </Form>
  );
};

export default InvoiceForm;
