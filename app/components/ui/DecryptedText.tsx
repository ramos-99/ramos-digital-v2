"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import React from "react";

// Characters to cycle through during scramble (uppercase only for stability)
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface DecryptedTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

function DecryptedTextComponent({
    text,
    className = "",
    delay = 0,
    duration = 2500,
}: DecryptedTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cleanup = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const reset = useCallback(() => {
        cleanup();
        let scrambled = "";
        for (let i = 0; i < text.length; i++) {
            if (text[i] === " ") {
                scrambled += " ";
            } else {
                scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
        }
        setDisplayText(scrambled);
    }, [text, cleanup]);

    useEffect(() => {
        if (isInView) {
            cleanup();

            timeoutRef.current = setTimeout(() => {
                const startTime = Date.now();

                intervalRef.current = setInterval(() => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const revealedCount = Math.floor(progress * text.length);

                    let result = "";
                    for (let i = 0; i < text.length; i++) {
                        if (i < revealedCount) {
                            result += text[i];
                        } else if (text[i] === " ") {
                            result += " ";
                        } else {
                            result += CHARS[Math.floor(Math.random() * CHARS.length)];
                        }
                    }

                    setDisplayText(result);

                    if (progress >= 1) {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                        setDisplayText(text);
                    }
                }, 100);
            }, delay);
        } else {
            reset();
        }

        return cleanup;
    }, [isInView, text, delay, duration, cleanup, reset]);

    return (
        <span
            ref={ref}
            // PERMANENT font-mono with tracking-tighter for headline look
            className={`font-mono tracking-tighter ${className}`}
            style={{
                fontVariantNumeric: "tabular-nums",
            }}
        >
            {displayText}
        </span>
    );
}

export const DecryptedText = React.memo(DecryptedTextComponent);
