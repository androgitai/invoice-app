import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import useCountdown from '../../hooks/use-countdown';

import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.svg';
import moonIconSVG from '../../assets/icon-moon.svg';
import sunIconSVG from '../../assets/icon-sun.svg';
import LogoutWarningModal from './Modals/LogoutWarningModal';
import Avatar from './Elements/Avatar';
import UserMenu from './Elements/UserMenu';

const MainNavigation = () => {
  const { isLoggedIn, tokenRemainingTime } = useSelector(state => state.auth);
  const { showLogoutModal, logoutWarned, showUserMenuModal } = useSelector(state => state.ui);
  const { remainingTime, setTimer, remainingTimeInSecs } = useCountdown(tokenRemainingTime);
  const [theme, setTheme] = useState('dark');
  const dispatch = useDispatch();

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

  return (
    <nav className={classes.nav} data-theme={isLoggedIn ? 'fluid' : ''}>
      {showLogoutModal && <LogoutWarningModal />}
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
        {!isLoggedIn && (
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : classes.inactive)}
              to='/about'
            >
              About
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
            <Avatar avatarType='nav'>
              {isLoggedIn && showUserMenuModal && <UserMenu remainingTime={remainingTime} />}
            </Avatar>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
