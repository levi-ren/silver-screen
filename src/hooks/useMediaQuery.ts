import { useEffect, useState } from "react";
import { useHydration } from "./useHydration";

export const useMediaQuery = (min: number, max?: number) => {
  const ready = useHydration();
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const resize = () => {
      setMatches(min < window.innerWidth);
    };
    window.addEventListener("resize", resize);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [min]);

  return { ready, isMatch: matches };
};
