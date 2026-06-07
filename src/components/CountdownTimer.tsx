"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const targetDate = new Date(deadline).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  if (!isClient) return <div className="h-20" />;

  return (
    <div className="flex gap-4 text-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-3xl font-bold text-slate-300 mt-2">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-3xl font-bold text-slate-300 mt-2">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-3xl font-bold text-slate-300 mt-2">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-xs font-semibold text-slate-500 uppercase mt-2">{label}</span>
    </div>
  );
}
