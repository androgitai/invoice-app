import { Link } from 'react-router-dom';

const MainNavigation = () => {
  return (
    <nav>
      <Link to='/invoices'>Invoices</Link>
      <Link to='/invoices/id1'>Invoices</Link>
    </nav>
  );
};

export default MainNavigation;
