import { useEffect, useState } from "react";

export const useHydration = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready;
};
