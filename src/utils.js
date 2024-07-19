export const debounce = (fn, msec) => {
  let lastCall = 0;
  let lastCallTimer = 0;
  return (...arg) => {
    const prevCall = lastCall;
    lastCall = Date.now();
    if (prevCall && lastCall - prevCall <= msec) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => fn(...arg), msec);
  }
};

export const calculateDeliveryTime = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const deliveryHour = currentHour < 18 ? currentHour + 3 : 9;
  const deliveryTime = `${deliveryHour}:00`;
  if (currentHour >= 18) {
    return `Завтра ${deliveryTime}`;
  } else {
    return `Сегодня ${deliveryTime}`;
  }
};