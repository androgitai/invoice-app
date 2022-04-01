import { useSelector } from 'react-redux';

import Wrapper from '../components/UI/Layout/Wrapper';
import InvoicesHead from '../components/Invoices/InvoicesHead';
import InvoicesList from '../components/Invoices/InvoicesList';
import NoInvoices from '../components/UI/Elements/NoInvoices';

const InvoicesPage = () => {
  const totalInvoices = useSelector(state => state.invoices.totalInvoices);
  console.log(totalInvoices);

  return (
    <Wrapper>
      <InvoicesHead />
      <InvoicesList />
      {!totalInvoices && <NoInvoices />}
    </Wrapper>
  );
};

export default InvoicesPage;
