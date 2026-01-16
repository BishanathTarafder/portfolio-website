'use client';

import { useEffect, useRef, useState } from 'react';

type IntersectionObserverOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
};

/**
 * Custom hook for detecting when an element enters the viewport
 * @param options Configuration options for the IntersectionObserver
 * @returns [ref, isIntersecting] - Ref to attach to the element and boolean indicating if element is in viewport
 */
export function useIntersectionObserver({
  threshold = 0.3,
  rootMargin = '0px',
  triggerOnce = true
}: IntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Save the current ref value to a variable
    const currentRef = ref.current;
    
    // If we already triggered once and triggerOnce is true, don't re-observe
    if (triggerOnce && isIntersecting) return;

    // Cleanup previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection changes
        setIsIntersecting(entry.isIntersecting);
        
        // If element has intersected and we only want to trigger once, unobserve
        if (entry.isIntersecting && triggerOnce && observerRef.current && currentRef) {
          observerRef.current.unobserve(currentRef);
        }
      },
      { threshold, rootMargin }
    );

    // Start observing the element
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    // Cleanup function
    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce, isIntersecting]);

  return [ref, isIntersecting] as const;
}