import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { uiActions } from '../../store/ui-slice';
import { invoicesActions } from '../../store/invoices-slice';
import useCountdown from '../../hooks/use-countdown';

import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.svg';
import moonIconSVG from '../../assets/icon-moon.svg';
import sunIconSVG from '../../assets/icon-sun.svg';
import LogoutWarningModal from './Modals/LogoutWarningModal';
import avatarPicture from '../../assets/image-avatar.jpg';

const MainNavigation = () => {
  const { isLoggedIn, tokenRemainingTime } = useSelector(state => state.auth);
  const { showLogoutModal, logoutWarned } = useSelector(state => state.ui);
  const { remainingTime, setTimer, remainingTimeInSecs } = useCountdown(tokenRemainingTime);
  const [theme, setTheme] = useState('dark');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimer(tokenRemainingTime);
    dispatch(uiActions.logoutWarnedFalse());
    return () => {
      setTimer();
    };
  }, [dispatch, setTimer, tokenRemainingTime]);

  useEffect(() => {
    if (isLoggedIn && !logoutWarned && remainingTimeInSecs !== 0 && remainingTimeInSecs < 300000) {
      dispatch(uiActions.showLogoutModal());
      dispatch(uiActions.logoutWarnedTrue());
    }
  }, [dispatch, remainingTimeInSecs, showLogoutModal, logoutWarned, isLoggedIn]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const changeThemeHandler = () => {
    setTheme(prevState => (prevState === 'light' ? 'dark' : 'light'));
  };

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
    <nav className={classes.nav} data-theme=''>
      {showLogoutModal && <LogoutWarningModal onLogout={logoutHandler} />}
      <div className={classes.logo}>
        <NavLink to='/'>
          <img src={logo} alt='Logo' />
        </NavLink>
      </div>
      <ul>
        <li onClick={changeThemeHandler}>
          {theme === 'light' ? (
            <img src={moonIconSVG} alt='Color mode button' />
          ) : (
            <img src={sunIconSVG} alt='Color mode button' />
          )}
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : classes.inactive)}
              to='/invoices'
            >
              Invoices
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : classes.inactive)}
            to='/about'
          >
            About
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              to='/profile'
              className={({ isActive }) => (isActive ? classes.active : classes.inactive)}
            >
              Profile
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : classes.inactive)}
              to='/auth'
            >
              Login
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <p onClick={logoutHandler}>Logout</p>
            <p className={classes.timer}>{remainingTime}</p>
          </li>
        )}
        {/* <li>
          <img className={classes.avatar} src={avatarPicture} alt='Avatar' />
        </li> */}
      </ul>
    </nav>
  );
};

export default MainNavigation;
