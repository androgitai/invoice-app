import classes from './Card.module.css';

const Card = props => {
  const { cardType } = props;
  const cardClasses = `${classes.card} ${classes[cardType]}`;

  return <div className={cardClasses}>{props.children}</div>;
};

export default Card;
