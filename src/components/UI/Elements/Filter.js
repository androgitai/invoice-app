import { useDispatch, useSelector } from 'react-redux';
import { invoicesActions } from '../../../store/invoices-slice';
import Card from '../Layout/Card';

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.invoices.filterBy);
  const paidChecked = filters.includes('paid');
  const pendingdChecked = filters.includes('pending');
  const draftChecked = filters.includes('draft');

  const filterCheckedHandler = event => {
    const clickedBox = event.target.id;
    dispatch(invoicesActions.toggleFilter(clickedBox));
  };

  return (
    <Card cardType='filterCard'>
      <ul>
        <li>
          <label htmlFor='paid' onClick={filterCheckedHandler}>
            <input name='paid' defaultChecked={paidChecked} type='checkbox' id='paid' />
            <h4>Paid</h4>
          </label>
        </li>
        <li>
          <label htmlFor='pending' onClick={filterCheckedHandler}>
            <input name='pending' defaultChecked={pendingdChecked} type='checkbox' id='pending' />
            <h4>Pending</h4>
          </label>
        </li>
        <li>
          <label htmlFor='draft' onClick={filterCheckedHandler}>
            <input name='draft' defaultChecked={draftChecked} type='checkbox' id='draft' />
            <h4>Draft</h4>
          </label>
        </li>
      </ul>
    </Card>
  );
};

export default Filter;
