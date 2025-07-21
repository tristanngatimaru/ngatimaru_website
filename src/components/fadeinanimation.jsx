import { useState, useEffect, useRef } from "react";

export default function FadeInSection({
  children,
  delay = 0,
  direction = "up",
}) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -150px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  let startTransform = "";
  switch (direction) {
    case "down":
      startTransform = "-translate-y-12"; // Moves slightly upward from its position
      break;
    case "up":
      startTransform = "translate-y-12"; // Moves slightly downward from its position
      break;
    case "left":
      startTransform = "translate-x-12"; // Moves slightly to the right
      break;
    case "right":
      startTransform = "-translate-x-12"; // Moves slightly to the left
      break;
    default:
      startTransform = "translate-y-12";
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1000ms] ease-in-out h-full w-full ${
        isVisible
          ? "translate-y-0 translate-x-0 opacity-100"
          : `${startTransform} opacity-0`
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
