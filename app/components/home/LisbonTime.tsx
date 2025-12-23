"use client";

import { useState, useEffect } from "react";

// Lisbon Time Widget Component
// Lisbon Time Widget Component
export function LisbonTime({ className = "" }: { className?: string }) {
    const [time, setTime] = useState("--:--:--");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date().toLocaleTimeString("en-GB", {
                timeZone: "Europe/Lisbon",
                hour: "2-digit",
                minute: "2-digit",

            });
            setTime(now + " GMT");
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <p className={className}>
            {time}
        </p>
    );
}
