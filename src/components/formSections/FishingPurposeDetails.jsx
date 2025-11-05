import React from "react";

const FishingPurposeDetails = ({ formData, handleChange, errors }) => {
  return (
    <div className="mb-5 w-full">
      <h3 className="text-xl font-roboto-bold text-emerald-800 mb-4">
        Fishing Purpose & Event Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Purpose for Fishing */}
        <div className="sm:col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.PurposeForFishing}
              onChange={(e) =>
                handleChange("PurposeForFishing")(e.target.checked)
              }
              className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Commercial/Customary Fishing Purpose
            </label>
          </div>
        </div>

        {/* Number Attending */}
        <div className="sm:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Number Attending <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            value={formData.NumberAttending}
            onChange={(e) => handleChange("NumberAttending")(e.target.value)}
            className={`bg-gray-50 border ${
              errors.NumberAttending ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="How many people will be fishing"
          />
          {errors.NumberAttending && (
            <p className="text-red-600 text-sm mt-1">
              {errors.NumberAttending}
            </p>
          )}
        </div>

        {/* Venue Contact Number */}
        <div className="sm:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Venue Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.VenueContactNumber}
            onChange={(e) => handleChange("VenueContactNumber")(e.target.value)}
            className={`bg-gray-50 border ${
              errors.VenueContactNumber ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Contact number for the venue"
          />
          {errors.VenueContactNumber && (
            <p className="text-red-600 text-sm mt-1">
              {errors.VenueContactNumber}
            </p>
          )}
        </div>

        {/* Location to be used at */}
        <div className="sm:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Location/Venue to be Used At <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.ToBeUsedAt}
            onChange={(e) => handleChange("ToBeUsedAt")(e.target.value)}
            className={`bg-gray-50 border ${
              errors.ToBeUsedAt ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Where will the fishing take place"
          />
          {errors.ToBeUsedAt && (
            <p className="text-red-600 text-sm mt-1">{errors.ToBeUsedAt}</p>
          )}
        </div>

        {/* Date to be used */}
        <div className="sm:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Date to be Used When <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.ToBeUsedWhen}
            onChange={(e) => handleChange("ToBeUsedWhen")(e.target.value)}
            className={`bg-gray-50 border ${
              errors.ToBeUsedWhen ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.ToBeUsedWhen && (
            <p className="text-red-600 text-sm mt-1">{errors.ToBeUsedWhen}</p>
          )}
        </div>

        {/* Time of Harvest */}
        <div className="sm:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Time of Harvest <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={formData.TimeOfHarvest}
            onChange={(e) => handleChange("TimeOfHarvest")(e.target.value)}
            className={`bg-gray-50 border ${
              errors.TimeOfHarvest ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            min={new Date().toISOString().slice(0, 16)}
          />
          {errors.TimeOfHarvest && (
            <p className="text-red-600 text-sm mt-1">{errors.TimeOfHarvest}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FishingPurposeDetails;
