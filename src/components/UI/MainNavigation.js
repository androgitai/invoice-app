import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { uiActions } from '../../store/ui-slice';
import { invoicesActions } from '../../store/invoices-slice';

import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.svg';
import moonIconSVG from '../../assets/icon-moon.svg';
import sunIconSVG from '../../assets/icon-sun.svg';
import avatarPicture from '../../assets/image-avatar.jpg';

const MainNavigation = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const [theme, setTheme] = useState('dark');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate('/');
  };

  return (
    <nav className={classes.nav} data-theme=''>
      <div className={classes.logo}>
        <Link to='/'>
          <img src={logo} alt='Logo' />
        </Link>
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
            <Link to='/invoices'>Invoices</Link>
          </li>
        )}
        <li>
          <Link to='/about'>About</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <Link to='/auth'>Login</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <p onClick={logoutHandler}>Logout</p>
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
