import classes from './Layout.module.css';
import MainNavigation from '../MainNavigation';
import { useSelector } from 'react-redux';

const Layout = props => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <main className={isLoggedIn ? classes.layoutFluid : classes.layout}>
      <MainNavigation />
      {props.children}
    </main>
  );
};

export default Layout;
