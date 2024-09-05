type DebounceFunction = (...args: any[]) => void;

export const debounce = (fn: DebounceFunction, msec: number): DebounceFunction => {
  let lastCall = 0;
  let lastCallTimer: ReturnType<typeof setTimeout> | null = null;

  return (...args: any[]) => {
    const prevCall = lastCall;
    lastCall = Date.now();

    if (prevCall && lastCall - prevCall <= msec) {
      if (lastCallTimer) {
        clearTimeout(lastCallTimer);
      }
    }

    lastCallTimer = setTimeout(() => fn(...args), msec);
  };
};

export const calculateDeliveryTime = (): string => {
  const now = new Date();
  const currentHour = now.getHours();
  const deliveryHour = currentHour < 18 ? currentHour + 3 : 9;
  const deliveryTime = `${deliveryHour}:00`;

  return currentHour >= 18 ? `Завтра ${deliveryTime}` : `Сегодня ${deliveryTime}`;
};
