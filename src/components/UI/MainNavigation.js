import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.svg';
import moonIconSVG from '../../assets/icon-moon.svg';
import sunIconSVG from '../../assets/icon-sun.svg';

import Avatar from './Elements/Avatar';
import Button from './Elements/Button';

const MainNavigation = () => {
  const themeMode = useSelector(state => state.ui.themeMode);
  const { isLoggedIn } = useSelector(state => state.auth);
  const tokenExpiryTime = useSelector(state => state.auth.tokenExpiryTime);
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const changeThemeHandler = () => {
    dispatch(uiActions.toggleThemeMode());
  };

  const onShowAuthModal = () => {
    dispatch(uiActions.toggleAuthModal());
  };

  return (
    <nav className={classes.nav} data-theme={isLoggedIn ? 'fluid' : ''}>
      <NavLink to='/' className={classes.logo}>
        <img src={logo} alt='Logo' />
      </NavLink>
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
            <Button btnType='nav' onClick={onShowAuthModal}>
              Login
            </Button>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Avatar avatarType='nav' key={tokenExpiryTime} />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
