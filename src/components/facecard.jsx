import React from "react";

export default function FaceCard({
  imageSrc = "",
  name = "",
  title = "",
  description = "",
  className = "",
  direction = "up",
}) {
  const directionClass =
    {
      up: "lg:translate-y-full lg:group-hover:translate-y-0",
      down: "lg:-translate-y-full lg:group-hover:translate-y-0",
      left: "lg:translate-x-full lg:group-hover:translate-x-0",
      right: "lg:-translate-x-full lg:group-hover:translate-x-0",
    }[direction] || "lg:translate-y-full lg:group-hover:translate-y-0";

  return (
    <div
      className={`group relative w-full h-full overflow-hidden ${className}`}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover object-center"
        />

        {/* Hover overlay for lg and up */}
        <div
          className={`hidden lg:flex absolute top-0 left-0 h-full w-full flex-col justify-center items-center text-center p-4 transition-transform duration-500 ease-in-out ${directionClass}`}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

          <div className="relative z-10 text-white">
            <h2 className="font-roboto-bold text-2xl">{name}</h2>
            <p className="font-roboto-light text-lg text-gray-300">{title}</p>
            <p className="font-roboto-light text-sm text-gray-400 mt-4">
              {description}
            </p>
          </div>
        </div>

        {/* Static mobile overlay at bottom */}
        <div className="lg:hidden absolute bottom-0 left-0 w-full bg-black/70 text-white text-center p-4">
          <h2 className="font-roboto-bold text-xl">{name}</h2>
          <p className="font-roboto-light text-sm text-gray-300">{title}</p>
          <p className="font-roboto-light text-xs text-gray-400 mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
