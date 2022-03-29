import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import NotFound from './components/UI/Elements/NotFound';
import InvoiceDetails from './pages/InvoiceDetailsPage';
import InvoicesPage from './pages/InvoicesPage';
import InvoiceFormModal from './components/UI/Modals/InvoiceFormModal';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate to='/invoices' />} />
        <Route path='/form' element={<InvoiceFormModal />} />
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
