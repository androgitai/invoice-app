import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { invoicesActions } from '../../../store/invoices-slice';
import { authActions } from '../../../store/auth-slice';
import { uiActions } from '../../../store/ui-slice';

import Card from '../Layout/Card';
import classes from './UserMenu.module.css';

const UserMenu = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logoutUser());
    dispatch(invoicesActions.resetInvoiceData());
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Logout',
        message: `You have successfully logged out!`,
      })
    );
    dispatch(uiActions.hideLogoutModal());
    dispatch(uiActions.logoutWarnedFalse());
    navigate('/');
  };

  return (
    <Card cardType='userMenu'>
      <ul>
        <li>
          <NavLink
            to='/invoices'
            className={({ isActive }) => (isActive ? classes.active : classes.inactive)}
          >
            Invoices
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/profile'
            className={({ isActive }) => (isActive ? classes.active : classes.inactive)}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : classes.inactive)}
            to='/about'
          >
            About
          </NavLink>
        </li>
        <li onClick={logoutHandler}>
          <p>Logout</p>
          <p className={classes.timer}>({props.remainingTime})</p>
        </li>
      </ul>
    </Card>
  );
};

export default UserMenu;
