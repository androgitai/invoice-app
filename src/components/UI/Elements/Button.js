import classes from './Button.module.css';

const Button = props => {
  const btnType = props.btnType;
  const btnClasses = `${classes[btnType]} ${classes.btn}`;

  return (
    <button
      className={btnClasses}
      onClick={props.onClick}
      type={props.type ? props.type : 'button'}
      name={props.name}
    >
      {props.children}
    </button>
  );
};

export default Button;
