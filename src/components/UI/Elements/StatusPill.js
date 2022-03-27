import classes from './StatusPill.module.css';

const StatusPill = props => {
  const status = props.status;
  const pillClasses = `${classes[status]} ${classes.item4}`;

  return (
    <ul className={pillClasses}>
      <li>
        <h4>
          <div className={classes.dot}></div>
          {status}
        </h4>
      </li>
    </ul>
  );
};

export default StatusPill;
