import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import NotFound from './components/UI/Elements/NotFound';
import InvoiceDetails from './pages/InvoiceDetailsPage';
import InvoicesPage from './pages/InvoicesPage';
import InvoiceForm from './components/Invoices/InvoiceForm/InvoiceForm';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate to='/invoices' />} />
        <Route path='/form' element={<InvoiceForm />} />
        <Route path='/invoices' element={<InvoicesPage />} />
        <Route path='/invoices/:invoiceId' element={<InvoiceDetails />} />
        <Route
          path='*'
          element={
            <main>
              <NotFound />
            </main>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
