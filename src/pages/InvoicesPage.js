import Invoices from '../components/Invoices/Invoices';
import InvoicesHead from '../components/Invoices/InvoicesHead';
import InvoicesList from '../components/Invoices/InvoicesList';

const InvoicesPage = () => {
  return (
    <Invoices>
      <InvoicesHead />
      <InvoicesList />
    </Invoices>
  );
};

export default InvoicesPage;
