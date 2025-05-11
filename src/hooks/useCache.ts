import { useState, useEffect, useRef, useCallback } from "react";

interface CacheOptions {
  key: string;
  fetchFn: () => Promise<any>;
  ttl?: number; // tempo de vida em milissegundos
}

export function useCache({ key, fetchFn, ttl = 5 * 60 * 1000 }: CacheOptions) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const didFetch = useRef(false);

  const invalidateCache = useCallback(() => {
    localStorage.removeItem(key);
    setData(null);
  }, [key]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const checkCacheAndFetch = async () => {
      const cachedData = localStorage.getItem(key);
      if (cachedData) {
        try {
          const { data: cachedValue, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < ttl) {
            setData(cachedValue);
            setLoading(false);
            return;
          }
        } catch (err) {
          // Se o cache estiver corrompido, ignora e faz fetch
        }
      }

      try {
        const result = await fetchFn();
        if (!isMounted) return;
        setData(result);
        setError(null);
        localStorage.setItem(
          key,
          JSON.stringify({
            data: result,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (!didFetch.current) {
      didFetch.current = true;
      checkCacheAndFetch();
    }

    return () => {
      isMounted = false;
    };
  }, [key, fetchFn, ttl]);

  return { data, loading, error, invalidateCache };
}
