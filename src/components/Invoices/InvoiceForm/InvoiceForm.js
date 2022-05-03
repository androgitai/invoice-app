import { useSelector, useDispatch } from 'react-redux';
import { updateInvoice, sendNewInvoice } from '../../../store/invoices-http-actions';
import { generateInvoice } from '../../../lib/invoice-utility';
import useForm from '../../../hooks/use-form';

import Button from '../../UI/Elements/Button';
import Form from './Layout/Form';
import InvoiceFormItem from './InvoiceFormItem';
import InvoiceFieldset from './Layout/InvoiceFieldset';
import InvoiceFormList from './ItemList/InvoiceFormList';
import Wrapper from '../../UI/Layout/Wrapper';
import classes from './InvoiceForm.module.css';
import { invoiceFormErrorsTemplate } from '../../../lib/form-templates';

const InvoiceForm = props => {
  const isNewForm = props.isNewForm;
  const dispatch = useDispatch();
  const { currentInvoice, currentInvoiceId, invoiceFormTemplate, invoices } = useSelector(
    state => state.invoices
  );
  const { formState, formErrors, fullFormValidity, dispatchFormChange, setValidating } = useForm(
    isNewForm ? invoiceFormTemplate : currentInvoice,
    invoiceFormErrorsTemplate,
    true
  );
  const openFormId = isNewForm ? 'new' : currentInvoice.id;
  const currentIds = invoices.map(item => item[Object.keys(item)].id);

  const formSubmitHandler = event => {
    event.preventDefault();
    const submitType = event.nativeEvent.submitter.name;
    if (submitType === 'send') {
      setValidating(true);
      if (!fullFormValidity.isFormValid) {
        console.log('invalid submit');
        return;
      }
    }
    const newInvoiceItem = generateInvoice(formState, openFormId, submitType, currentIds);

    if (openFormId !== 'new') {
      dispatch(updateInvoice(newInvoiceItem, currentInvoiceId));
    }
    if (openFormId === 'new') {
      dispatch(sendNewInvoice(newInvoiceItem));
    }
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
            error={formErrors.senderAddress.street ? formErrors.senderAddress.street : ''}
          />
          <InvoiceFormItem
            type='text'
            name='City'
            id='senderAddress.city'
            defVal={formState.senderAddress.city}
            gridArea='gridArea2'
            dispatchChange={dispatchFormChange}
            error={formErrors.senderAddress.city}
          />
          <InvoiceFormItem
            type='text'
            name='Post Code'
            id='senderAddress.postCode'
            defVal={formState.senderAddress.postCode}
            gridArea='gridArea3'
            dispatchChange={dispatchFormChange}
            error={formErrors.senderAddress.postCode}
          />
          <InvoiceFormItem
            type='text'
            name='Country'
            id='senderAddress.country'
            defVal={formState.senderAddress.country}
            gridArea='gridArea4'
            dispatchChange={dispatchFormChange}
            error={formErrors.senderAddress.country}
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
            error={formErrors.clientName}
          />
          <InvoiceFormItem
            type='email'
            name={`Client's Email`}
            id='clientEmail'
            placeHold='e.g. email@example.com'
            defVal={formState.clientEmail}
            gridArea='gridArea2'
            dispatchChange={dispatchFormChange}
            error={formErrors.clientEmail}
          />
          <InvoiceFormItem
            type='text'
            name='Street Address'
            id='clientAddress.street'
            defVal={formState.clientAddress.street}
            gridArea='gridArea3'
            dispatchChange={dispatchFormChange}
            error={formErrors.clientAddress.street}
          />
          <InvoiceFormItem
            type='text'
            name='City'
            id='clientAddress.city'
            defVal={formState.clientAddress.city}
            gridArea='gridArea4'
            dispatchChange={dispatchFormChange}
            error={formErrors.clientAddress.city}
          />
          <InvoiceFormItem
            type='text'
            name='Post Code'
            id='clientAddress.postCode'
            defVal={formState.clientAddress.postCode}
            gridArea='gridArea5'
            dispatchChange={dispatchFormChange}
            error={formErrors.clientAddress.postCode}
          />
          <InvoiceFormItem
            type='text'
            name='Country'
            id='clientAddress.country'
            defVal={formState.clientAddress.country}
            gridArea='gridArea6'
            dispatchChange={dispatchFormChange}
            error={formErrors.clientAddress.country}
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
            error={formErrors.createdAt}
          />
          <InvoiceFormItem
            type='select'
            defVal={formState.paymentTerms}
            gridArea='gridArea2'
            dispatchChange={dispatchFormChange}
            error={formErrors.paymentTerms}
          />
          <InvoiceFormItem
            type='text'
            name='Project Description'
            id='description'
            placeHold='e.g. Graphic Design Service'
            defVal={formState.description}
            gridArea='gridArea3'
            dispatchChange={dispatchFormChange}
            error={formErrors.description}
          />
        </InvoiceFieldset>
        <InvoiceFormList
          gridAreas={classes.itemList}
          items={formState.items}
          dispatchChange={dispatchFormChange}
          error={formErrors.items}
        />
        {/* {validating && <p className={classes.error}>{formErrors.items}</p>}
        {validating && formErrors.total !== '' && (
          <p className={classes.error}>- Add a valid item</p>
        )}
        {validating && <p className={classes.error}>{allFormErrors}</p>} */}
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
