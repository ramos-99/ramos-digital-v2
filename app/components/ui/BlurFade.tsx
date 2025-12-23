"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurFadeProps {
    children: React.ReactNode;
    className?: string;
    yOffset?: number;
    blur?: string;
    duration?: number;
    delay?: number;
}

export default function BlurFade({ children, className, yOffset = 20, blur = "10px", duration = 0.8 }: BlurFadeProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset, filter: `blur(${blur})` }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: duration, ease: [0.25, 0.4, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
