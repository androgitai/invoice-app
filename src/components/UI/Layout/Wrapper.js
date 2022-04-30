import classes from './Wrapper.module.css';

const Wrapper = props => {
  return (
    <section className={props.wrapType === 'form' ? classes.wrapperForm : classes.wrapper}>
      {props.children}
    </section>
  );
};

export default Wrapper;
