import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import useCountdown from '../../../hooks/use-countdown';
import { calculateRemainingTime } from '../../../lib/helper';

import classes from './Timer.module.css';

const Timer = () => {
  const dispatch = useDispatch();
  const tokenExpiryTime = useSelector(state => state.auth.tokenExpiryTime);
  const { remainingTime, setTimer, isExpiring } = useCountdown(500000);
  useEffect(() => {
    const tokenRemainingTime = calculateRemainingTime(tokenExpiryTime);
    setTimer(tokenRemainingTime);
    return () => {
      setTimer(0);
    };
  }, [setTimer, tokenExpiryTime]);
  useEffect(() => {
    if (isExpiring) dispatch(uiActions.showLogoutModal());
    else dispatch(uiActions.hideLogoutModal());

    return () => {};
  }, [dispatch, isExpiring]);

  return <p className={classes.timer}>({remainingTime})</p>;
};

export default Timer;
