import { useEffect, useState } from "react";

function getWindowDimensions() {
  return { width: window.innerWidth, height: window.innerHeight };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function onResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return windowDimensions;
}
