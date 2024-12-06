import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("clicked outside");
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing); // this "true" makes this event happen in the capturing phase,we need this beause the eventd gets bubbled up and since the Modal is attached to body the Modal open btn is a child, so the Modal opens for a millisecind and closes.
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
