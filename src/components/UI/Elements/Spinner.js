import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={classes.spinner}>
      <svg className={classes.spinnerSVG} xmlns='http://www.w3.org/2000/svg' width='28' height='26'>
        <path
          className={classes.spinnerSVGPath}
          fill='#fff'
          fillRule='evenodd'
          d='M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z'
        />
      </svg>
      <h3>Loading...</h3>
    </div>
  );
};

export default Spinner;
