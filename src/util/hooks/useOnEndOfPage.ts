import { useEffect } from "react";

export default function useOnEndOfPage(
  fn: () => void,
  element: React.RefObject<HTMLElement>,
  offset: number = 0,
  condition: boolean = true,
) {
  useEffect(() => {
    function onScroll() {
      if (
        element.current &&
        window.innerHeight >
          element.current.getBoundingClientRect().bottom - offset &&
        condition
      ) {
        fn();
        console.log("scroll function called");
      }
      console.log(
        "element bottom:",
        element.current?.getBoundingClientRect().bottom,
      );
      console.log("window:", window.innerHeight);
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [condition, element, fn, offset]);
}
