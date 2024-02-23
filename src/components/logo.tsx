import { twMerge } from "tailwind-merge";
import Anchor from "./anchor";

interface LogoProps {
  className?: string;
  size?: "base" | "large";
}

export default function Logo({ className, size }: LogoProps) {
  return (
    <div className={twMerge(className, "relative ")}>
      <Anchor aria-label="Link to home page" href="/">
        <span
          className={twMerge(
            "text-5xl md:text-6xl absolute right-1/2 translate-x-1/2 top-[60%] -translate-y-[60%] text-white/30",
            size === "large" && "text-7xl md:text-7xl"
          )}
        >
          S
        </span>
        <span
          className={twMerge(
            "text-5xl md:text-6xl absolute right-1/2 translate-x-1/2 top-[30%] -translate-y-[30%] text-white/30",
            size === "large" && "text-7xl md:text-7xl"
          )}
        >
          S
        </span>
        <p
          className={twMerge(
            "md:text-2xl font-bebas small-caps text-xl",
            size === "large" && "text-3xl md:text-4xl"
          )}
        >
          Silver Screen
        </p>
      </Anchor>
    </div>
  );
}
