import classes from './StatusPill.module.css';

const StatusPill = props => {
  const status = props.status;
  const pillClasses = `${classes[status]} ${classes.pill}`;

  return (
    <div className={pillClasses}>
      <h4>
        <div className={classes.dot} />
        {status}
      </h4>
    </div>
  );
};

export default StatusPill;
