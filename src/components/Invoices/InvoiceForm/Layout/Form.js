const Form = props => {
  return (
    <form onSubmit={props.onSubmit} id='invoiceForm'>
      {props.children}
    </form>
  );
};

export default Form;
