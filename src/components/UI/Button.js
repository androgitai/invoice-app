import classes from './Button.module.css';

const Button = props => {
  const btnType = props.btnType;
  const btnClasses = `${classes[btnType]} ${classes.btn}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span>{props.children}</span>
    </button>
  );
};

export default Button;
