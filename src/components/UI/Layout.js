import classes from './Layout.module.css';

import MainNavigation from './MainNavigation';

const Layout = props => {
  return (
    <div className={classes.layout}>
      <MainNavigation />
      {props.children}
    </div>
  );
};

export default Layout;
