import { useState, useEffect } from "react";

function BookingSummary({ children }) {
  const [isSticky, setIsSticky] = useState(false);

  const STICKY_SCROLL_THRESHOLD = 200;

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > STICKY_SCROLL_THRESHOLD) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`bg-white p-8 rounded shadow w-full ${
        isSticky ? "sticky top-20" : "relative"
      }`}
      style={{
        overflow: "visible",
      }}
    >
      {children}
    </div>
  );
}

export default BookingSummary;
