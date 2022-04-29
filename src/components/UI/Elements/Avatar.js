import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import classes from './Avatar.module.css';

const Avatar = props => {
  const dispatch = useDispatch();
  const type = props.avatarType;
  const name = useSelector(state => state.profile.name);
  const firstLetter = name?.charAt(0);

  const onClickHandler = () => {
    if (type === 'nav') dispatch(uiActions.toggleUserMenuModal());
  };

  return (
    <div className={classes.avatar} onClick={onClickHandler}>
      <h2>{firstLetter}</h2>
      {type === 'nav' && props.children}
    </div>
  );
};

export default Avatar;
