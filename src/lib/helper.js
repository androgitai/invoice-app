export const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const remainingTime = expirationTime - currentTime;
  //if + token still active, if - expired
  return remainingTime;
};
export const calculateExpiryTime = expirationTime => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(+expirationTime * 1000).getTime();

  const expiryTime = adjustedExpirationTime + currentTime;

  return expiryTime;
};
