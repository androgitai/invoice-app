import { useCallback, useEffect, useState } from 'react';

const useCountdown = (initialTimer = 0) => {
  const [remainingTime, setRemainingTime] = useState(initialTimer);

  const setTimer = useCallback(time => {
    setRemainingTime(time);
  }, []);

  useEffect(() => {
    const timer = () => setTimeout(() => setRemainingTime(prevState => prevState - 1000), 1000);
    if (remainingTime > 0) timer();
    if (remainingTime === 0) {
      clearTimeout(timer);
    }
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
  return { remainingTime: timer, setTimer };
};

export default useCountdown;
