import { useCallback } from 'react';

export const useErrorHandler = () => {
  const handleError = useCallback((error) => {
    if (typeof error === 'string') {
      console.error(error);
    } else if (error?.message) {
      console.error(error.message);
    } else {
      console.error('An unexpected error occurred');
    }
  }, []);

  return {
    error: null,
    handleError
  };
}; 