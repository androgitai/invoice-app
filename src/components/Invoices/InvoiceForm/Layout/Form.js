const Form = props => {
  return (
    <form onSubmit={props.onSubmit} id='invoiceForm' noValidate>
      {props.children}
    </form>
  );
};

export default Form;
