import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllInvoices } from './store/invoices-http-actions';
import { uiActions } from './store/ui-slice';
import { fetchProfile } from './store/profile-http-actions';

import InvoiceDetailsPage from './pages/InvoiceDetailsPage';
import InvoicesPage from './pages/InvoicesPage';
import Notification from './components/UI/Elements/Notification';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import Layout from './components/UI/Layout/Layout';
import Spinner from './components/UI/Elements/Spinner';
import AuthModal from './components/UI/Modals/AuthModal';

function App() {
  const dispatch = useDispatch();
  const { notification, showAuthModal } = useSelector(state => state.ui);
  const { idToken, userId, isLoggedIn } = useSelector(state => state.auth);

  const isLoading = useSelector(state => state.ui.isLoading);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(uiActions.showNotification());
      }, 4000);
    }
  }, [dispatch, notification]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchAllInvoices());
      dispatch(fetchProfile());
    }
  }, [dispatch, idToken, userId, isLoggedIn]);

  return (
    <Layout>
      {isLoading && <Spinner />}
      {notification && <Notification notification={notification} />}
      {!isLoggedIn && showAuthModal && <AuthModal />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        {isLoggedIn && <Route path='/profile' element={<ProfilePage />} />}
        {isLoggedIn && <Route path='/invoices' element={<InvoicesPage />} />}
        {isLoggedIn && (
          <Route path='/invoices/:invoiceIdFromRoute' element={<InvoiceDetailsPage />} />
        )}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
