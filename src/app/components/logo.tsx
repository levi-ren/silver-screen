import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface LogoProps {
  className?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <div className={twMerge(props.className, "relative")}>
      <Link href="/">
        <span className="text-5xl md:text-6xl absolute right-1/2 translate-x-1/2 top-[60%] -translate-y-[60%] text-white/30">
          S
        </span>
        <span className="text-5xl md:text-6xl absolute right-1/2 translate-x-1/2 top-[30%] -translate-y-[30%] text-white/30">
          S
        </span>
        <p className="md:text-xl ">Silver Screen</p>
      </Link>
    </div>
  );
}
