import { Link } from 'react-router-dom';

import Button from '../../UI/Elements/Button';
import Card from '../../UI/Layout/Card';
import Form from './Form';
import FormItem from './FormItem';
import classes from './InvoiceForm.module.css';
import arrowLeftSVG from '../../../assets/icon-arrow-left.svg';

const InvoiceForm = () => {
  const formSubmitHandler = event => {
    event.preventDefault();
    console.log('Submitted...');
  };

  return (
    <Card>
      <Link to='/'>
        <img className={classes.backButtonImg} src={arrowLeftSVG} alt='Back' />
        <h4 className={classes.backButtonH4}>Go back</h4>
      </Link>
      <Form onSubmit={formSubmitHandler}>
        <FormItem type={'text'} />
        <FormItem type={'text'} />
        <FormItem type={'text'} />
        <Button btnType='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default InvoiceForm;
