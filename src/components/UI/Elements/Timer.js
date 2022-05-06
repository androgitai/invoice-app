import classes from './Timer.module.css';

const Timer = props => {
  return <p className={classes.timer}>({props.time})</p>;
};

export default Timer;
