import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllInvoices } from './store/invoices-http-actions';
import { uiActions } from './store/ui-slice';
import { authActions } from './store/auth-slice';
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
  const { idToken, userId, isLoggedIn, tokenRemainingTime } = useSelector(state => state.auth);

  const isLoading = useSelector(state => state.ui.isLoading);

  useEffect(() => {
    const logoutTimer = () =>
      setTimeout(() => dispatch(authActions.logoutUser()), tokenRemainingTime);
    if (isLoggedIn) {
      logoutTimer();
    }
    return () => {
      clearTimeout(logoutTimer);
    };
  }, [dispatch, isLoggedIn, tokenRemainingTime]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(uiActions.showNotification());
      }, 5000);
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
      {/* <button onClick={pushServer}>Populate</button> */}
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
