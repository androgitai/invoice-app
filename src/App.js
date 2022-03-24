import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/UI/Layout';
import NotFound from './components/UI/NotFound';
import Invoice from './pages/InvoiceDetailPage';
import Invoices from './pages/InvoicesPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate to='/invoices' />} />
        <Route path='/invoices' element={<Invoices />} />
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
