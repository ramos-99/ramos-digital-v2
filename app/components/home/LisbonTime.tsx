"use client";

import { useState, useEffect } from "react";

// Lisbon Time Widget Component
export function LisbonTime() {
    const [time, setTime] = useState("--:--:--");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date().toLocaleTimeString("en-GB", {
                timeZone: "Europe/Lisbon",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            setTime(now);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <p className="text-3xl font-heading font-bold text-white tabular-nums">
            {time}
        </p>
    );
}
