const FormItem = props => {
  return (
    <label>
      Name:
      <input type={props.type} />
    </label>
  );
};

export default FormItem;
