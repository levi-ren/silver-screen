"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preconnect("https://www.youtube.com", { crossOrigin: "anonymous" });

  return <></>;
}
