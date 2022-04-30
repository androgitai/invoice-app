import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.svg';
import moonIconSVG from '../../assets/icon-moon.svg';
import sunIconSVG from '../../assets/icon-sun.svg';
import LogoutWarningModal from './Modals/LogoutWarningModal';
import Avatar from './Elements/Avatar';
import UserMenu from './Elements/UserMenu';

const MainNavigation = () => {
  const themeMode = useSelector(state => state.ui.themeMode);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { showLogoutModal, showUserMenuModal } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const changeThemeHandler = () => {
    dispatch(uiActions.toggleThemeMode());
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
          {themeMode === 'light' ? (
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
            <Avatar avatarType='nav'>{isLoggedIn && showUserMenuModal && <UserMenu />}</Avatar>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
