import { useEffect, useRef } from "react";

const useInfiniteScroll = (onScrollEnd) => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      //  console.log("scrolling...");
      if (container) {
        // console.log("scrollTop:", container.scrollTop);
        // console.log("clientHeight:", container.clientHeight);
        // console.log("scrollHeight:", container.scrollHeight);

        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight
        ) {
          // console.log("Loading more data...");
          onScrollEnd();
        }
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [onScrollEnd]);

  return containerRef;
};

export default useInfiniteScroll;
