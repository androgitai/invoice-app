import { useSelector } from 'react-redux';

import classes from './About.module.css';
import Card from '../UI/Layout/Card';
import filterPic from '../../assets/pictures/Filter.jpg';
import filterPicDark from '../../assets/pictures/FilterDark.jpg';
import invoicesPic from '../../assets/pictures/Invoices.jpg';
import invoicesPicDark from '../../assets/pictures/InvoicesDark.jpg';
import invoiceDetails from '../../assets/pictures/InvoiceDetails.jpg';
import invoiceDetailsDark from '../../assets/pictures/InvoiceDetailsDark.jpg';
import newInvoice from '../../assets/pictures/NewInvoice.jpg';
import newInvoiceDark from '../../assets/pictures/NewInvoiceDark.jpg';
import editInvoice from '../../assets/pictures/EditInvoice.jpg';
import editInvoiceDark from '../../assets/pictures/EditInvoiceDark.jpg';

const About = () => {
  const themeMode = useSelector(state => state.ui.themeMode);
  let invoices = invoicesPic;
  let filter = filterPic;
  let details = invoiceDetails;
  let newInv = newInvoice;
  let editInv = editInvoice;

  if (themeMode === 'dark') {
    invoices = invoicesPicDark;
    filter = filterPicDark;
    details = invoiceDetailsDark;
    newInv = newInvoiceDark;
    editInv = editInvoiceDark;
  }

  return (
    <section className={classes.aboutPage}>
      <h1>About our app</h1>
      <p>
        Welcome to our invoice app! It is time to get you paperwork to sort out once and for all. It
        is an easy and quick way to sort out your daily finances in your business.
      </p>
      <h2>Invoices</h2>
      <p>
        Look through your invoices with ease in a list format and find the one you are looking for
        with ease or use the filter for even easier access.
      </p>
      <Card cardType='aboutPage'>
        <img className={classes.image} src={invoices} alt='Invoices' />
        <img className={classes.filter} src={filter} alt='Filter' />
      </Card>
      <h2>Invoice Details</h2>
      <p>
        Click on the list to open up the one particular invoiceand you can see all the details.
        Edit, Mark as Paid or delete it as your choice in the menu to have full control.
      </p>
      <Card cardType='aboutPage'>
        <img className={classes.image} src={details} alt='Invoice Details' />
      </Card>
      <h2>Create/Edit Invoices</h2>
      <p>
        You can either create new invoice or edit saved ones. New invoices can be saved as draft and
        does not have to fully complete so you can come back later and finish what you started.
        Although if you like to send the invoice straight away it has to be filled out to be sent
        and already sent invoices can be adjusted as well with ease.
      </p>
      <Card cardType='aboutPage'>
        <img className={classes.image} src={newInv} alt='New invoice' />
        <img className={classes.image} src={editInv} alt='Edit invoice' />
      </Card>
      <p>
        Disclamer: Altough this project works and and data processed through Google Firebase secure
        API it is created with a presentational purpose. If you wish to use we do not take
        responsibility for any data sercurity or lost data. Use it on your own risk.
      </p>
    </section>
  );
};

export default About;
