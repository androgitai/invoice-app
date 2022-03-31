import Wrapper from '../components/UI/Layout/Wrapper';
import InvoicesHead from '../components/Invoices/InvoicesHead';
import InvoicesList from '../components/Invoices/InvoicesList';
import NoInvoices from '../components/UI/Elements/NoInvoices';

const InvoicesPage = () => {
  return (
    <Wrapper>
      <InvoicesHead />
      <InvoicesList />
      {/* <NoInvoices /> */}
    </Wrapper>
  );
};

export default InvoicesPage;
