import { useCallback, useEffect, useMemo, useState } from 'react';

const useCountdown = warningTime => {
  const [remainingTime, setRemainingTime] = useState(0);

  const isExpiring = useMemo(() => remainingTime < warningTime, [remainingTime, warningTime]);

  const setTimer = useCallback(time => {
    setRemainingTime(time);
  }, []);

  useEffect(() => {
    const timerFn = setInterval(() => {
      if (remainingTime <= 0) clearInterval(timerFn);
      setRemainingTime(prevState => prevState - 1000);
    }, 1000);
    return () => {
      clearInterval(timerFn);
    };
  }, [remainingTime]);

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
  return { remainingTime: timer, setTimer, remainingTimeMillSecs: remainingTime, isExpiring };
};

export default useCountdown;
