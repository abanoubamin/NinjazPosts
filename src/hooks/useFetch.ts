import {useEffect, useReducer, useRef} from 'react';

import {APP_ID, BASE_URL} from '../config';

interface State<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

type Cache<T> = {[url: string]: T};

// discriminated union type
type Action<T> =
  | {type: 'loading'}
  | {type: 'fetched'; payload: T}
  | {type: 'error'; payload: Error};

export function useFetch<T = unknown>(url?: string): State<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return {...initialState, loading: true};
      case 'fetched':
        return {...initialState, data: action.payload};
      case 'error':
        return {...initialState, error: action.payload};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) {
      return;
    }

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({type: 'loading'});

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({type: 'fetched', payload: cache.current[url]});
        return;
      }

      try {
        const response = await fetch(BASE_URL + url, {
          headers: {'app-id': APP_ID},
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) {
          return;
        }

        dispatch({type: 'fetched', payload: data});
      } catch (error) {
        if (cancelRequest.current) {
          return;
        }

        dispatch({type: 'error', payload: error as Error});
      }
    };

    fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
}
