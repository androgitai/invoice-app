import Card from '../Layout/Card';

const Filter = props => {
  return (
    <Card cardType='filterCard'>
      <ul>
        <li>
          <label htmlFor='filterPaid'>
            <input name='filterPaid' type='checkbox' value='Paid' />
            <h4>Paid</h4>
          </label>
        </li>
        <li>
          <label htmlFor='filterPending'>
            <input name='filterPending' type='checkbox' value='Pending' />
            <h4>Pending</h4>
          </label>
        </li>
        <li>
          <label htmlFor='filterDraft'>
            <input name='filterDraft' type='checkbox' value='Draft' />
            <h4>Draft</h4>
          </label>
        </li>
      </ul>
    </Card>
  );
};

export default Filter;
