'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface EventCountdownProps {
    targetDate: string; // YYYY-MM-DD
    targetTime?: string; // HH:MM
    color?: string;
}

export function EventCountdown({ targetDate, targetTime, color = '#E91E63' }: EventCountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    useEffect(() => {
        if (!targetDate) return;

        let targetDateStr = targetDate;
        if (targetTime) {
            targetDateStr += `T${targetTime}:00`;
        } else {
            targetDateStr += 'T00:00:00';
        }

        const calculateTimeLeft = () => {
            const difference = +new Date(targetDateStr) - +new Date();
            let newTimeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

            if (difference > 0) {
                newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }

            setTimeLeft(newTimeLeft);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate, targetTime]);

    if (!timeLeft) return null;

    return (
        <div className="flex justify-center gap-3 mt-4 mb-4">
            {[
                { label: 'Días', value: timeLeft.days },
                { label: 'Horas', value: timeLeft.hours },
                { label: 'Min.', value: timeLeft.minutes },
                { label: 'Seg.', value: timeLeft.seconds },
            ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div
                        className="w-12 h-14 rounded-lg flex items-center justify-center font-bold text-lg mb-1 shadow-sm backdrop-blur-md"
                        style={{
                            backgroundColor: `${color}15`,
                            color: color,
                            border: `1px solid ${color}30`
                        }}
                    >
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={item.value}
                                initial={{ y: 5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -5, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {item.value.toString().padStart(2, '0')}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <span className="text-[10px] uppercase font-semibold" style={{ color: color, opacity: 0.8 }}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
