const throttle = (func: Function, ms: number) => {
  let isThrottled = false;
  let savedArgs: any[] | null;

  const wrapper = (...args: any[]) => {
    if (isThrottled) {
      savedArgs = args;
      return;
    }

    func(...args);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper(...savedArgs);
        savedArgs = null;
      }
    }, ms);
  };

  return wrapper;
};

export default throttle;
