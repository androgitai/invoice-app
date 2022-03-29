import classes from './Layout.module.css';
import MainNavigation from '../MainNavigation';

const Layout = props => {
  return (
    <main className={classes.layout}>
      <MainNavigation />
      {props.children}
    </main>
  );
};

export default Layout;
