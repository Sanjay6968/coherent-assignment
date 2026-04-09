import { useState, useEffect, useRef } from 'react';

export function useFetch(fetcher, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);

    fetcher()
      .then(d => { if (!ctrl.signal.aborted) { setData(d); setLoading(false); } })
      .catch(e => { if (!ctrl.signal.aborted) { setError(e.message); setLoading(false); } });

    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
