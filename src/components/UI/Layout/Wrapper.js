import classes from './Wrapper.module.css';

const Wrapper = props => {
  return (
    <div
      className={
        props.wrapType === 'form' ? classes.wrapperForm : classes.wrapper
      }
    >
      {props.children}
    </div>
  );
};

export default Wrapper;
