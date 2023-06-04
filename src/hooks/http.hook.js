import { useState, useCallback } from 'react';
export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState('waiting');

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
      setLoading(true);
      setProcess('loading');
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
        setProcess('error');
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError, process, setProcess };
};
