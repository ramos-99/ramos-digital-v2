"use client";

import { useState, useEffect, useCallback, type RefCallback } from "react";

// Scroll reveal hook using callback ref pattern
export function useScrollReveal(): {
    ref: RefCallback<HTMLElement>;
    isRevealed: boolean;
} {
    const [isRevealed, setIsRevealed] = useState(false);
    const [element, setElement] = useState<HTMLElement | null>(null);

    // Callback ref that stores the element in state
    const ref: RefCallback<HTMLElement> = useCallback((node: HTMLElement | null) => {
        setElement(node);
    }, []);

    useEffect(() => {
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [element]);

    return { ref, isRevealed };
}
