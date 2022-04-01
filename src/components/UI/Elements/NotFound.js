import classes from './NotFound.module.css';
import emptySVG from '../../../assets/illustration-empty.svg';

const NotFound = () => {
  return (
    <div className={classes.empty}>
      <img src={emptySVG} alt='No Invoices' />
      <h1>404 - Page Not Found!</h1>
      <div>
        <p>The page you are trying to reach does not exist!</p>
      </div>
    </div>
  );
};

export default NotFound;
