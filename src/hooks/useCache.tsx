import { useState, useEffect, useCallback } from "react";

interface CacheOptions<T> {
  key: string;
  fetchFn: () => Promise<T>;
  ttl?: number; // Tempo de vida do cache em milissegundos
}

interface CacheData<T> {
  data: T;
  timestamp: number;
}

export function useCache<T>({
  key,
  fetchFn,
  ttl = 5 * 60 * 1000,
}: CacheOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchFn();
      setData(response);
      setError(null);

      // Salva no cache
      const cacheData: CacheData<T> = {
        data: response,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheData));

      console.log("Dados carregados da API:", response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    }
  }, [key, fetchFn]);

  const invalidateCache = useCallback(() => {
    localStorage.removeItem(key);
    setData(null);
  }, [key]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const cachedData = localStorage.getItem(key);

        if (cachedData) {
          const { data: cachedValue, timestamp } = JSON.parse(
            cachedData
          ) as CacheData<T>;
          const isExpired = Date.now() - timestamp > ttl;

          if (!isExpired) {
            setData(cachedValue);
            setError(null);
            setLoading(false);
            console.log("Dados carregados do cache:", cachedValue);
            return;
          }
        }

        await fetchData();
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [key, ttl, fetchData]);

  return { data, loading, error, invalidateCache };
}
