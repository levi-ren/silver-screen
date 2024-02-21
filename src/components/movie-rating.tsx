import { twMerge } from "tailwind-merge";

interface MovieRatingProps {
  rating: number;
  absolute?: boolean;
  className?: string;
  font?: "small" | "large";
  votes?: number;
}

export default function MovieRating({
  rating,
  absolute = true,
  className,
  font = "small",
  votes,
}: MovieRatingProps) {
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
    <div
      className={twMerge(
        " bg-black/90 rounded-full w-11 h-11 p-[2px]",
        absolute && "absolute -bottom-4 left-2 z-10",
        className
      )}
      title={votes ? `Rated by ${votes} reviewers` : undefined}
    >
      <div
        className="relative bg-transparent rounded-full flex items-center justify-center h-full pie before:bg-gray-900 "
        style={{ "--p": rating, "--c": color }}
      >
        <span className={twMerge("text-xs font-bold", font && "text-base")}>
          {Math.round(rating)}
        </span>
        <span className={twMerge("text-[8px]", font && "text-xs")}>%</span>
      </div>
    </div>
  );
}
