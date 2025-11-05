import React from "react";

const FishingHarvesters = ({
  formData,
  handleHarvesterChange,
  addHarvester,
  removeHarvester,
  errors,
}) => {
  return (
    <div className="mb-5 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-roboto-bold text-emerald-800">
          Associated Harvesters
        </h3>
        <button
          type="button"
          onClick={addHarvester}
          className="px-6 py-3 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition"
        >
          + Add Harvester
        </button>
      </div>

      <div className="space-y-6">
        {formData.Harvesters.map((harvester, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-roboto-bold text-gray-700">
                Harvester #{index + 1}
              </h4>
              {formData.Harvesters.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHarvester(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={harvester.FirstName}
                  onChange={(e) =>
                    handleHarvesterChange(index, "FirstName", e.target.value)
                  }
                  className={`bg-gray-50 border ${
                    errors[`Harvesters_${index}_FirstName`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Harvester first name"
                />
                {errors[`Harvesters_${index}_FirstName`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`Harvesters_${index}_FirstName`]}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={harvester.LastName}
                  onChange={(e) =>
                    handleHarvesterChange(index, "LastName", e.target.value)
                  }
                  className={`bg-gray-50 border ${
                    errors[`Harvesters_${index}_LastName`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Harvester last name"
                />
                {errors[`Harvesters_${index}_LastName`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`Harvesters_${index}_LastName`]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FishingHarvesters;
