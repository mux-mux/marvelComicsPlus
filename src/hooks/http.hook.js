import { useState, useCallback } from 'react';
export const useHttp = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
      try {
        const resp = await fetch(url, { method, body, headers });
        if (!resp.ok) {
          throw new Error(`Error ${url}, status: ${resp.status}`);
        }
        const data = await resp.json();
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
