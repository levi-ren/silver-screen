interface MovieRatingProps {
  rating: number;
}

export default function MovieRating({ rating }: MovieRatingProps) {
  let color = "";
  if (rating < 25) {
    color = "#ef4444";
  } else if (rating < 5) {
    color = "#f97316";
  } else if (rating < 75) {
    color = "#eab308";
  } else {
    color = "#22c55e";
  }

  return (
    <div className="absolute -bottom-4 left-2 z-10  bg-black/90 rounded-full w-11 h-11 p-[2px]">
      <div
        className="relative bg-transparent rounded-full flex items-center justify-center h-full pie before:bg-gray-900 "
        style={{ "--p": rating, "--c": color }}
      >
        <span className="text-xs font-bold">{Math.round(rating)}</span>
        <span className="text-[8px]">%</span>
      </div>
    </div>
  );
}
