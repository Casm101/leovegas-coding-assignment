// Module imports
import { useEffect, useCallback } from 'react';

// Hook declaration
export const useInfiniteScroll = (callback: () => void) => {
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      console.log('should be scrolling');
      callback();
    }
  }, [callback]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return;
};
