import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface ApiLog {
  url: string;
  payload: BodyInit | null;
  status: number;
  timestamp: string;
}

const useFetch = <T,>(url: string, options: RequestInit = {}): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        const status = response.status;
        const result = (await response.json()) as T;

        const payload = options.body ?? null;
        console.log(`[useFetch] ${url}`, { payload, status });

        const logs = JSON.parse(
          localStorage.getItem('api_logs') || '[]'
        ) as ApiLog[];
        logs.push({ url, payload, status, timestamp: new Date().toISOString() });
        localStorage.setItem('api_logs', JSON.stringify(logs));

        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
