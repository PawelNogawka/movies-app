import { useEffect, useState } from "react";

export const useFetch = (path, queryTerm = "", movieId) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      const url = !movieId
        ? `https://api.themoviedb.org/3/${path}?api_key=7e18ca8d7e31eb72f1b7c353b5881459&query=${queryTerm}`
        : `https://api.themoviedb.org/3/${path}?api_key=7e18ca8d7e31eb72f1b7c353b5881459`;
   
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const json = await response.json();

        if (isMounted) {
          if (movieId) {
            setData(json);
          } else {
            setData(json.results);
          }

          setIsLoading(false);
          setError(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsLoading(false);
          setError(error.message);
          console.log(error.message);
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [path, queryTerm, movieId]);

  return { isLoading, data, error };
};
