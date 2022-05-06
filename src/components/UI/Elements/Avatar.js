import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { calculateRemainingTime } from '../../../lib/helper';
import { authActions } from '../../../store/auth-slice';
import useCountdown from '../../../hooks/use-countdown';

import LogoutWarningModal from '../Modals/LogoutWarningModal';
import classes from './Avatar.module.css';
import UserMenu from './UserMenu';

const TIMER_WARNING_MILSECS = 300000;
const TIMER_LOGOUT_MILSECS = 10000;

const Avatar = props => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth);
  const { showUserMenuModal, showLogoutModal } = useSelector(state => state.ui);
  const type = props.avatarType;
  const name = useSelector(state => state.profile.name);
  const firstLetter = name?.charAt(0);
  const tokenExpiryTime = useSelector(state => state.auth.tokenExpiryTime);
  const { remainingTime, setTimer, isExpiring, remainingTimeMillSecs } =
    useCountdown(TIMER_WARNING_MILSECS);

  useEffect(() => {
    const tokenRemainingTime = calculateRemainingTime(tokenExpiryTime);
    setTimer(tokenRemainingTime);
    return () => {
      setTimer(0);
    };
  }, [setTimer, tokenExpiryTime]);

  useEffect(() => {
    if (
      remainingTimeMillSecs !== 0 &&
      remainingTimeMillSecs < TIMER_LOGOUT_MILSECS &&
      isLoggedIn &&
      isExpiring
    ) {
      setTimer(0);
      dispatch(uiActions.hideLogoutModal());
      dispatch(authActions.logoutUser());
    }
  }, [dispatch, remainingTimeMillSecs, setTimer, isExpiring, isLoggedIn]);

  useEffect(() => {
    if (isExpiring) dispatch(uiActions.showLogoutModal());
    else dispatch(uiActions.hideLogoutModal());

    return () => {};
  }, [dispatch, isExpiring]);

  const onClickHandler = () => {
    if (type === 'nav') dispatch(uiActions.toggleUserMenuModal());
  };

  return (
    <div
      className={type !== 'nav' ? classes.avatar : `${classes.avatar} ${classes.nav}`}
      onClick={onClickHandler}
    >
      {showLogoutModal && <LogoutWarningModal time={remainingTime} />}
      <h2>{firstLetter}</h2>
      {type === 'nav' && isLoggedIn && showUserMenuModal && <UserMenu time={remainingTime} />}
    </div>
  );
};

export default Avatar;
