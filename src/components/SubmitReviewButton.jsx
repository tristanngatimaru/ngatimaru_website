// src/components/SubmitReviewButton.jsx

import React from "react";

// src/components/SubmitReviewButton.jsx

const SubmitReviewButton = ({ onClick }) => {
  return (
    <div className="col-span-2 flex justify-end mt-10">
      <button
        type="button"
        onClick={onClick}
        className="px-6 py-3 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitReviewButton;
