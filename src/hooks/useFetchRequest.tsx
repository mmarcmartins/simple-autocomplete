import { useEffect, useState } from "react";

export const useFetchRequest = <T,>(url:string) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchData = async (url:string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError("No network response");
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {    
    fetchData(url);
  }, []);

  return { data, loading, error };
}