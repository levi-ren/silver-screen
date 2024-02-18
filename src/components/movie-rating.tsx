"use client";

import { useEffect, useRef } from "react";

interface MovieRatingProps {
  rating: number;
}

export default function MovieRating({ rating }: MovieRatingProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + rating * 2 * Math.PI;
      if (ctx) {
        ctx.beginPath();
        ctx.arc(24, 24, 18, startAngle, endAngle);
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        if (rating < 0.25) {
          ctx.strokeStyle = "#ef4444";
        } else if (rating < 0.5) {
          ctx.strokeStyle = "#f97316";
        } else if (rating < 0.75) {
          ctx.strokeStyle = "#eab308";
        } else {
          ctx.strokeStyle = "#22c55e";
        }
        ctx.stroke();
      }
    }
  }, [rating]);

  return (
    <div className="absolute -bottom-4 left-2 z-10  bg-black/90 rounded-full flex items-center justify-center w-11 h-11">
      <canvas ref={ref} width={48} height={48} className="absolute" />
      <span className="text-xs font-bold">{Math.round(rating * 100)}</span>
      <span className="text-[8px]">%</span>
    </div>
  );
}
