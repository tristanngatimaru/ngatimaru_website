import React, { useState, useEffect } from "react";

export default function AppearRefresh({
  delay = 500,
  className = "",
  children,
}) {
  const [isAppear, setAppear] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAppear(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`${className} transition-all duration-1000 ease-in-out ${
        isAppear ? "translate-y-0" : "translate-y-20"
      }`}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
