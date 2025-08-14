import React from "react";

const FishingSpeciesDetails = ({
  formData,
  handleSpeciesChange,
  addSpecies,
  removeSpecies,
  errors,
}) => {
  return (
    <div className="mb-5 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-roboto-bold text-emerald-800">
          Species Details
        </h3>
        <button
          type="button"
          onClick={addSpecies}
          className="px-6 py-3 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition"
        >
          + Add Species
        </button>
      </div>

      <div className="space-y-6">
        {formData.Species.map((species, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-roboto-bold text-gray-700">
                Species #{index + 1}
              </h4>
              {formData.Species.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSpecies(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Species Name */}
              <div className="sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Species Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={species.SpeciesName}
                  onChange={(e) =>
                    handleSpeciesChange(index, "SpeciesName", e.target.value)
                  }
                  className={`bg-gray-50 border ${
                    errors[`Species_${index}_SpeciesName`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="e.g., Snapper, Kingfish, Crayfish"
                />
                {errors[`Species_${index}_SpeciesName`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`Species_${index}_SpeciesName`]}
                  </p>
                )}
              </div>

              {/* Harvest Method */}
              <div className="sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Harvest Method <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={species.HarvestMethod}
                  onChange={(e) =>
                    handleSpeciesChange(index, "HarvestMethod", e.target.value)
                  }
                  className={`bg-gray-50 border ${
                    errors[`Species_${index}_HarvestMethod`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="e.g., Rod and Line, Net, Trap/Pot, Spear"
                />
                {errors[`Species_${index}_HarvestMethod`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`Species_${index}_HarvestMethod`]}
                  </p>
                )}
              </div>

              {/* Area Taken */}
              <div className="sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Area Taken <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={species.AreaTaken}
                  onChange={(e) =>
                    handleSpeciesChange(index, "AreaTaken", e.target.value)
                  }
                  className={`bg-gray-50 border ${
                    errors[`Species_${index}_AreaTaken`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Location where fish will be caught"
                />
                {errors[`Species_${index}_AreaTaken`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`Species_${index}_AreaTaken`]}
                  </p>
                )}
              </div>

              {/* Area Landed */}
              <div className="sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Area Landed <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={species.AreaLanded}
                  onChange={(e) =>
                    handleSpeciesChange(index, "AreaLanded", e.target.value)
                  }
                  className={`bg-gray-50 border ${
                    errors[`Species_${index}_AreaLanded`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Location where fish will be landed"
                />
                {errors[`Species_${index}_AreaLanded`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`Species_${index}_AreaLanded`]}
                  </p>
                )}
              </div>

              {/* Time of Harvest */}
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Time of Harvest <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={species.TimeOfHarves}
                  onChange={(e) =>
                    handleSpeciesChange(index, "TimeOfHarves", e.target.value)
                  }
                  className={`bg-gray-50 border ${
                    errors[`Species_${index}_TimeOfHarves`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  min={new Date().toISOString().slice(0, 16)}
                />
                {errors[`Species_${index}_TimeOfHarves`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`Species_${index}_TimeOfHarves`]}
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

export default FishingSpeciesDetails;
