import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.svg';
import moonIconSVG from '../../assets/icon-moon.svg';
import sunIconSVG from '../../assets/icon-sun.svg';
import avatarPicture from '../../assets/image-avatar.jpg';
import { useEffect, useState } from 'react';

const MainNavigation = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const changeThemeHandler = () => {
    setTheme(prevState => (prevState === 'light' ? 'dark' : 'light'));
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
        <li>
          <img className={classes.avatar} src={avatarPicture} alt='Avatar' />
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
