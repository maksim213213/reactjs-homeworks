import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        const status = response.status;
        const result = await response.json();

        const payload = options.body ?? null;
        console.log(`[useFetch] ${url}`, { payload, status });

        const logs = JSON.parse(localStorage.getItem('api_logs') || '[]');
        logs.push({ url, payload, status, timestamp: new Date().toISOString() });
        localStorage.setItem('api_logs', JSON.stringify(logs));

        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
