import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.svg';
import moonIcon from '../../assets/icon-moon.svg';
import avatarPicture from '../../assets/image-avatar.jpg';

const MainNavigation = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.logo}>
        <Link to='/'>
          <img src={logo} alt='Logo' />
        </Link>
      </div>
      <ul>
        <li>
          <img src={moonIcon} alt='Color mode button' />
        </li>
        <li>
          <img className={classes.avatar} src={avatarPicture} alt='Avatar' />
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
