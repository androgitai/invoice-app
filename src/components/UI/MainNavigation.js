import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.svg';
import moonIcon from '../../assets/icon-moon.svg';
import avatarPicture from '../../assets/image-avatar.jpg';

const MainNavigation = () => {
  return (
    <nav className={classes.nav}>
      <Link to='/'>
        <img src={logo} alt='Logo' />
      </Link>
      <ul>
        <li>
          <img src={moonIcon} alt='Color mode button' />
        </li>
        <li>
          <img src={avatarPicture} alt='Avatar' />
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
