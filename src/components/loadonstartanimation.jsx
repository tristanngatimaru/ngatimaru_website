import React, { useState, useEffect } from "react";

export default function FadeInOnLoad({
  children,
  delay = 500,
  mobileDelay = 500,
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const timer = setTimeout(
      () => {
        setIsVisible(true);
      },
      isMobile ? mobileDelay : delay
    );

    return () => clearTimeout(timer);
  }, [delay, mobileDelay]);

  return (
    <div
      className={`
        transition-opacity duration-1000 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
