import React from "react";

const FishingPersonalDetails = ({ formData, handleChange, errors }) => {
  return (
    <div className="mb-5 w-full">
      <h3 className="text-xl font-roboto-bold text-emerald-800 mb-4">
        Permit Holder Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Applying Under Māori Rights */}
        <div className="sm:col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.ApplyingUnderMaoriRights}
              onChange={(e) =>
                handleChange("ApplyingUnderMaoriRights")(e.target.checked)
              }
              className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Applying Under Māori Rights
            </label>
          </div>
        </div>

        {/* Iwi Claim - only show if applying under Māori rights */}
        {formData.ApplyingUnderMaoriRights && (
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              What Iwi are you claiming under?
            </label>
            <input
              type="text"
              value={formData.IwiClaim}
              onChange={(e) => handleChange("IwiClaim")(e.target.value)}
              className={`bg-gray-50 border ${
                errors.IwiClaim ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              placeholder="Enter the iwi you are claiming under"
            />
            {errors.IwiClaim && (
              <p className="text-red-600 text-sm mt-1">{errors.IwiClaim}</p>
            )}
          </div>
        )}

        {/* First Name */}
        <div className="sm:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.FirstName}
            onChange={(e) => handleChange("FirstName")(e.target.value)}
            className={`bg-gray-50 border ${
              errors.FirstName ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="First Name Here"
          />
          {errors.FirstName && (
            <p className="text-red-600 text-sm mt-1">{errors.FirstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="sm:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.LastName}
            onChange={(e) => handleChange("LastName")(e.target.value)}
            className={`bg-gray-50 border ${
              errors.LastName ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Last Name Here"
          />
          {errors.LastName && (
            <p className="text-red-600 text-sm mt-1">{errors.LastName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="sm:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.PhoneNumber}
            onChange={(e) => handleChange("PhoneNumber")(e.target.value)}
            className={`bg-gray-50 border ${
              errors.PhoneNumber ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Phone number here"
          />
          {errors.PhoneNumber && (
            <p className="text-red-600 text-sm mt-1">{errors.PhoneNumber}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="sm:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.EmailAddress}
            onChange={(e) => handleChange("EmailAddress")(e.target.value)}
            className={`bg-gray-50 border ${
              errors.EmailAddress ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Email address here"
          />
          {errors.EmailAddress && (
            <p className="text-red-600 text-sm mt-1">{errors.EmailAddress}</p>
          )}
        </div>

        {/* Street Address */}
        <div className="sm:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.StreetAddress}
            onChange={(e) => handleChange("StreetAddress")(e.target.value)}
            className={`bg-gray-50 border ${
              errors.StreetAddress ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Street address here"
          />
          {errors.StreetAddress && (
            <p className="text-red-600 text-sm mt-1">{errors.StreetAddress}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FishingPersonalDetails;
