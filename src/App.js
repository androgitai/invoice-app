import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllInvoices, populateServer } from './store/invoices-http-actions';
import { uiActions } from './store/ui-slice';

import Layout from './components/UI/Layout/Layout';
import NotFound from './components/UI/Elements/NotFound';
import InvoiceDetailsPage from './pages/InvoiceDetailsPage';
import InvoicesPage from './pages/InvoicesPage';
import Notification from './components/UI/Elements/Notification';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import initialData from './assets/data.json';
import Spinner from './components/UI/Elements/Spinner';

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const { idToken, userId, isLoggedIn } = useSelector(state => state.auth);
  const isLoading = useSelector(state => state.ui.isLoading);

  const pushServer = () => {
    initialData.forEach(item => populateServer(item));
  };

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
    }
  }, [dispatch, idToken, userId, isLoggedIn]);

  return (
    <Layout>
      {/* <button onClick={pushServer}>Populate</button> */}
      {isLoading && <Spinner />}
      {notification && <Notification notification={notification} />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/invoices' element={<InvoicesPage />} />
        <Route path='/invoices/:invoiceIdFromRoute' element={<InvoiceDetailsPage />} />
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
