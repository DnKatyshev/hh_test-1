import * as React from 'react';
import debounce from 'lodash.debounce';

// Хук для debounce
export const useDebouncedCallback = (callback, delay) => {
  const debouncedCallback = React.useMemo(() => debounce(callback, delay), [callback, delay]);

  React.useEffect(() => {
    return () => debouncedCallback.cancel();
  }, [debouncedCallback]);

  return debouncedCallback;
};
