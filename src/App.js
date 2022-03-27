import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import NotFound from './components/UI/Elements/NotFound';
import Invoice from './pages/InvoiceDetailPage';
import InvoicesPage from './pages/InvoicesPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate to='/invoices' />} />
        <Route path='/invoices' element={<InvoicesPage />} />
        <Route path='/invoices/:invoiceId' element={<Invoice />} />
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
