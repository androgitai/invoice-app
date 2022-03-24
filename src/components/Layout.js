import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = props => {
  return (
    <Fragment>
      <MainNavigation />
      {props.children}
    </Fragment>
  );
};

export default Layout;
