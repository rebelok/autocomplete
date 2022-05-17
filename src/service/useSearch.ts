import React from 'react';
import { Movie } from '../types/Movie';

import throttle from './throttle';

const THROTTLE_TIME = 200;
const apiKey = process.env.REACT_APP_API;

type UseSearchFunction = (searchTerm: string, callback: (result: Movie[]) => void) => Promise<void>;

const useSearch = () => {
  const throttledFetch = React.useMemo<UseSearchFunction>(
    () =>
      throttle(async (searchTerm: string, callback: (result: Movie[]) => void) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
        );

        if (!response.ok) {
          callback([]);
        }

        const { results }: { results: Movie[] } = await response.json();

        callback(results || []);

        // skipping typing of the throttle function
      }, THROTTLE_TIME) as UseSearchFunction,
    []
  );

  return throttledFetch;
};

export default useSearch;
