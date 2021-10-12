import { useState, useCallback } from 'react';

export default function useAsyncFn(fn) {
  const [loading, setLoading] = useState(false);
  const call = useCallback(
    async (...params) => {
      setLoading(true);
      try {
        const result = await fn(...params);
        setLoading(false);
        return result;
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
    [fn],
  );
  return { call, loading };
}
