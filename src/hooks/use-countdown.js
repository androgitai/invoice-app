import { useCallback, useEffect, useState } from 'react';

const useCountdown = tokenTime => {
  const [remainingTime, setRemainingTime] = useState(tokenTime);

  const isExpiring = remainingTime < 300000;
  const setTimer = useCallback(time => {
    setRemainingTime(time);
  }, []);

  const timerFn = useCallback(
    () => setTimeout(() => setRemainingTime(prevState => prevState - 1000), 1000),
    []
  );

  useEffect(() => {
    clearTimeout(timerFn);
    if (remainingTime > 0) timerFn();
    if (remainingTime === 0 || remainingTime < 0) {
      clearTimeout(timerFn);
    }
    return () => clearTimeout(timerFn);
  }, [remainingTime, timerFn]);
  const displayTime = () => {
    const remainingTimeSeconds = Math.floor((+remainingTime / 1000) % 60)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((+remainingTime / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0');
    return minutes + ':' + remainingTimeSeconds;
  };

  const timer = displayTime();
  return { remainingTime: timer, setTimer, remainingTimeInSecs: remainingTime, isExpiring };
};

export default useCountdown;
