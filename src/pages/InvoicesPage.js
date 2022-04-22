import Wrapper from '../components/UI/Layout/Wrapper';
import InvoicesHead from '../components/Invoices/InvoicesHead';
import InvoicesList from '../components/Invoices/InvoicesList';

const InvoicesPage = () => {
  return (
    <Wrapper>
      <InvoicesHead />
      <InvoicesList />
    </Wrapper>
  );
};

export default InvoicesPage;
