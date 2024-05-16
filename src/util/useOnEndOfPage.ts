import { useEffect } from "react";

export default function useOnEndOfPage(
  fn: () => void,
  offset: number = 0,
  condition: boolean = true,
) {
  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + window.innerHeight >=
          document.body.offsetHeight - offset &&
        condition
      ) {
        fn();
      }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [condition, fn, offset]);
}
