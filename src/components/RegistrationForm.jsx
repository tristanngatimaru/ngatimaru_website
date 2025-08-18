import { useState } from "react";

const RegistrationForm = () => {
  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    PersonalSalutaion: "",
    PersonalGender: "",
    PersonalBirthDate: "",
    PersonalFirstName: "",
    PersonalLastName: "",
    PersonalMaidenName: "",
    PersonalAKA: "",
    PersonalOccupation: "",
    PersonalSpouce: false,
    PersonalContactDetails: "",
    PersonalPostalAddress: "",
    PersonalHomePhone: "",
    PersonalWorkPhone: "",
    PersonalMobilePhone: "",
    PersonalEmail: "",

    // Hapu & Iwi Information
    PrincipleHapu: "",
    PrincipleOtherIwiAffiliation: "",
    PrincipleMarae: "",
    OtherHapu: "",
    OtherIwiAffiliation: "",
    OtherMarae: "",
    DecendantAffiliation: "",

    // Genealogy - Father's Side (Men)
    FatherGreatGrandFatherMen: "",
    FatherGreatGrandMotherMen: "",
    FatherGrandFather: "",
    Father: "",

    // Genealogy - Father's Side (Women)
    FatherGreatGrandFatherWomen: "",
    FatherGreatGrandMotherWomen: "",
    FatherGrandMother: "",

    // Genealogy - Mother's Side (Men)
    MotherGreatGrandFatherMen: "",
    MotherGreatGrandMotherMen: "",
    MotherGrandFather: "",

    // Genealogy - Mother's Side (Women)
    MotherGreatGrandFatherWomen: "",
    MotherGreatGrandMotherWomen: "",
    MotherGrandMother: "",
    Mother: "",

    // Additional Information
    AdditionalInformation: "",
    AgreeToTerms: false,

    // Spouse Details (conditional)
    SpouseSalutation: "",
    SpouseGender: "",
    SpouseDateOfBirth: "",
    SpouseFirstName: "",
    SpouseLastName: "",
    SpouseMaidenName: "",
    SpouseAlsoKnownAs: "",
    SpouseIwi: "",

    // Postal Address (conditional)
    PostalAddress: false,
    PostalAddressYes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Autofill function for testing
  const autofillTestData = () => {
    const testData = {
      // Personal Information
      PersonalSalutaion: "Mr",
      PersonalGender: "Male",
      PersonalBirthDate: "1985-03-15",
      PersonalFirstName: "Tane",
      PersonalLastName: "Mahuta",
      PersonalMaidenName: "",
      PersonalAKA: "TM",
      PersonalOccupation: "Cultural Advisor",
      PersonalSpouce: true,
      PersonalContactDetails: "Available weekdays 9-5",
      PersonalPostalAddress: "123 Maori Street, Thames, 3500",
      PersonalHomePhone: "07 867 1234",
      PersonalWorkPhone: "07 867 5678",
      PersonalMobilePhone: "021 234 5678",
      PersonalEmail: "tane.mahuta@example.com",

      // Hapu & Iwi Information
      PrincipleHapu: "Te Ahumua",
      PrincipleOtherIwiAffiliation: "Ngāti Porou",
      PrincipleMarae: "Tararu Marae",
      OtherHapu: "Ngati Te Aute",
      OtherIwiAffiliation: "Tainui",
      OtherMarae: "Hotunui Marae",
      DecendantAffiliation: "Ngati Maru Descendant",

      // Genealogy - Father's Side (Men)
      FatherGreatGrandFatherMen: "Wiremu Mahuta",
      FatherGreatGrandMotherMen: "Hohepa Mahuta",
      FatherGrandFather: "Rangi Mahuta",
      Father: "Tama Mahuta",

      // Genealogy - Father's Side (Women)
      FatherGreatGrandFatherWomen: "Mere Mahuta",
      FatherGreatGrandMotherWomen: "Aroha Mahuta",
      FatherGrandMother: "Hinewai Mahuta",

      // Genealogy - Mother's Side (Men)
      MotherGreatGrandFatherMen: "Pita Wharekawa",
      MotherGreatGrandMotherMen: "Tamati Wharekawa",
      MotherGrandFather: "Hone Wharekawa",

      // Genealogy - Mother's Side (Women)
      MotherGreatGrandFatherWomen: "Whina Wharekawa",
      MotherGreatGrandMotherWomen: "Maata Wharekawa",
      MotherGrandMother: "Hinemoa Wharekawa",
      Mother: "Kiri Wharekawa",

      // Additional Information
      AdditionalInformation:
        "Test registration for development purposes. Active in community events and cultural preservation.",
      AgreeToTerms: true,

      // Spouse Details
      SpouseSalutation: "Mrs",
      SpouseGender: "Female",
      SpouseDateOfBirth: "1987-07-22",
      SpouseFirstName: "Aroha",
      SpouseLastName: "Mahuta",
      SpouseMaidenName: "Smith",
      SpouseAlsoKnownAs: "A",
      SpouseIwi: "Ngāti Maru",

      // Postal Address
      PostalAddress: true,
      PostalAddressYes: "PO Box 123, Thames, 3540",
    };

    // Set the entire form data with test values
    setFormData(testData);
  };

  const totalSteps = 5;

  // Predefined options from Strapi validation
  const hapuOptions = [
    "Te Ahumua",
    "Ngati Te Aute",
    "Ngati Kuriuaua",
    "Te uringahau",
    "Ngati Rautao",
    "Ngati Hikairo",
    "Ngati Wawenga",
    "Ngati Kotinga",
    "Ngati Whanga",
    "Ngati Pu",
    "Ngati Hauauru",
    "Ngati Ua",
    "Ngati Naunau",
    "Ngati Pakira",
    "Ngati Hape",
    "Ngati Tumoana",
    "Ngati Matau",
    "Te Matahau",
    "Ngati Tahae",
  ];

  const descendantAffiliationOptions = [
    "Ngati Maru Descendant",
    "Whanga of Ngati Maru Descendant",
    "Partner of Ngati Maru Descendant",
    "Descendant of the whangai of Ngati Maru Descendant",
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Navigation handlers
  const validateCurrentStep = () => {
    const errors = [];

    // Validate Step 1 - Personal Information
    if (currentStep === 1) {
      if (!formData.PersonalSalutaion) errors.push("Salutation is required");
      if (!formData.PersonalGender) errors.push("Gender is required");
      if (!formData.PersonalBirthDate) errors.push("Birth date is required");
      if (!formData.PersonalFirstName) errors.push("First name is required");
      if (!formData.PersonalLastName) errors.push("Last name is required");

      // If spouse is selected, validate spouse fields
      if (formData.PersonalSpouce) {
        if (!formData.SpouseSalutation)
          errors.push("Spouse salutation is required");
        if (!formData.SpouseGender) errors.push("Spouse gender is required");
        if (!formData.SpouseDateOfBirth)
          errors.push("Spouse date of birth is required");
        if (!formData.SpouseFirstName)
          errors.push("Spouse first name is required");
        if (!formData.SpouseLastName)
          errors.push("Spouse last name is required");
      }
    }

    // Validate Step 2 - Contact Information
    if (currentStep === 2) {
      if (!formData.PersonalEmail) errors.push("Email is required");

      // If postal address is selected, validate postal address field
      if (formData.PostalAddress && !formData.PostalAddressYes) {
        errors.push("Postal address details are required");
      }
    }

    // Validate Step 3 - Hapu & Iwi
    if (currentStep === 3) {
      if (!formData.PrincipleHapu) errors.push("Principal hapu is required");
      if (!formData.DecendantAffiliation)
        errors.push("Descendant affiliation is required");
    }

    // Validate Step 5 - Terms
    if (currentStep === 5) {
      if (!formData.AgreeToTerms) errors.push("You must agree to the terms");
    }

    return errors;
  };

  const nextStep = () => {
    const errors = validateCurrentStep();
    if (errors.length > 0) {
      setSubmitError(`Please fix the following errors: ${errors.join(", ")}`);
      setShowErrorModal(true);
      return;
    }

    setSubmitError(null);
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setSubmitError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log("🚀 Starting registration submission...");
      console.log("📝 Form data:", formData);

      // Create clean data object with only the fields Strapi expects
      const cleanFormData = {
        PersonalSalutaion: formData.PersonalSalutaion,
        PersonalGender: formData.PersonalGender,
        PersonalBirthDate: formData.PersonalBirthDate,
        PersonalFirstName: formData.PersonalFirstName,
        PersonalLastName: formData.PersonalLastName,
        PersonalMaidenName: formData.PersonalMaidenName,
        PersonalAKA: formData.PersonalAKA,
        PersonalOccupation: formData.PersonalOccupation,
        PersonalSpouce: formData.PersonalSpouce,
        PersonalContactDetails: formData.PersonalContactDetails,
        PersonalPostalAddress: formData.PersonalPostalAddress,
        PersonalHomePhone: formData.PersonalHomePhone,
        PersonalWorkPhone: formData.PersonalWorkPhone,
        PersonalMobilePhone: formData.PersonalMobilePhone,
        PersonalEmail: formData.PersonalEmail,
        PrincipleHapu: formData.PrincipleHapu,
        PrincipleOtherIwiAffiliation: formData.PrincipleOtherIwiAffiliation,
        PrincipleMarae: formData.PrincipleMarae,
        OtherHapu: formData.OtherHapu,
        OtherIwiAffiliation: formData.OtherIwiAffiliation,
        OtherMarae: formData.OtherMarae,
        DecendantAffiliation: formData.DecendantAffiliation,
        FatherGreatGrandFatherMen: formData.FatherGreatGrandFatherMen,
        FatherGreatGrandMotherMen: formData.FatherGreatGrandMotherMen,
        FatherGrandFather: formData.FatherGrandFather,
        Father: formData.Father,
        FatherGreatGrandFatherWomen: formData.FatherGreatGrandFatherWomen,
        FatherGreatGrandMotherWomen: formData.FatherGreatGrandMotherWomen,
        FatherGrandMother: formData.FatherGrandMother,
        MotherGreatGrandFatherMen: formData.MotherGreatGrandFatherMen,
        MotherGreatGrandMotherMen: formData.MotherGreatGrandMotherMen,
        MotherGrandFather: formData.MotherGrandFather,
        MotherGreatGrandFatherWomen: formData.MotherGreatGrandFatherWomen,
        MotherGreatGrandMotherWomen: formData.MotherGreatGrandMotherWomen,
        MotherGrandMother: formData.MotherGrandMother,
        Mother: formData.Mother,
        AdditionalInformation: formData.AdditionalInformation,
        AgreeToTerms: formData.AgreeToTerms,
        PostalAddress: formData.PostalAddress,
        PostalAddressYes: formData.PostalAddressYes,
      };

      // Add spouse details if spouse checkbox is checked
      if (formData.PersonalSpouce) {
        cleanFormData.Spouse = {
          Salutation: formData.SpouseSalutation,
          Gender: formData.SpouseGender,
          DateOfBirth: formData.SpouseDateOfBirth,
          FirstName: formData.SpouseFirstName,
          LastName: formData.SpouseLastName,
          MaidenName: formData.SpouseMaidenName,
          AlsoKnownAs: formData.SpouseAlsoKnownAs,
          Iwi: formData.SpouseIwi,
        };
      }

      console.log("📦 Payload:", { data: cleanFormData });

      // Use environment variable for API URL with proper endpoint
      const apiUrl = `${import.meta.env.VITE_STRAPI_API_URL.replace(/\/$/, "")}/api/register-applications`;
      console.log("🌐 API URL:", apiUrl);

      console.log("🧪 Trying registration submission...");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Remove auth header if not needed for public submissions
          // Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: cleanFormData,
        }),
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error response:", errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (parseError) {
          console.error(
            "❌ Could not parse error response:",
            parseError.message
          );
        }

        // Log validation errors for troubleshooting
        if (errorData?.error?.details?.errors) {
          console.error("📝 Validation details:", errorData.error.details);
          errorData.error.details.errors.forEach((err, index) => {
            console.error(
              `Validation Error ${index + 1}: ${err.path} - ${err.message}`
            );
          });
        }

        throw new Error(
          `HTTP ${response.status}: ${errorData?.error?.message || errorText}`
        );
      }

      const result = await response.json();
      console.log("✅ Registration submitted successfully:", result);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("💥 Registration submission failed:", error.message);
      setSubmitError(error.message);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Registration Submitted Successfully!
                </h3>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Thank you for your registration. Your application is now being
              processed by our team. You will be contacted if any additional
              information is required.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              If you need immediate assistance, please call us on 07 867 9104
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Registration Submission Error
                </h3>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{submitError}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div>
          <h3 className="text-2xl font-roboto-medium text-gray-800 mb-6">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Salutation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salutation *
              </label>
              <select
                value={formData.PersonalSalutaion}
                onChange={(e) =>
                  handleInputChange("PersonalSalutaion", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Select...</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
                <option value="Professor">Professor</option>
                <option value="Master">Master</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                value={formData.PersonalGender}
                onChange={(e) =>
                  handleInputChange("PersonalGender", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.PersonalFirstName}
                onChange={(e) =>
                  handleInputChange("PersonalFirstName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.PersonalLastName}
                onChange={(e) =>
                  handleInputChange("PersonalLastName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Date *
              </label>
              <input
                type="date"
                value={formData.PersonalBirthDate}
                onChange={(e) =>
                  handleInputChange("PersonalBirthDate", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            {/* Maiden Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maiden Name
              </label>
              <input
                type="text"
                value={formData.PersonalMaidenName}
                onChange={(e) =>
                  handleInputChange("PersonalMaidenName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* AKA (Also Known As) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Also Known As (AKA)
              </label>
              <input
                type="text"
                value={formData.PersonalAKA}
                onChange={(e) =>
                  handleInputChange("PersonalAKA", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupation
              </label>
              <input
                type="text"
                value={formData.PersonalOccupation}
                onChange={(e) =>
                  handleInputChange("PersonalOccupation", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Spouse checkbox */}
          <div className="mt-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.PersonalSpouce}
                onChange={(e) =>
                  handleInputChange("PersonalSpouce", e.target.checked)
                }
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">
                I have a spouse/partner
              </span>
            </label>
          </div>

          {/* Spouse Details (conditional) */}
          {formData.PersonalSpouce && (
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="text-lg font-roboto-medium text-emerald-800 mb-4">
                Spouse/Partner Details
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Spouse Salutation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salutation *
                  </label>
                  <select
                    value={formData.SpouseSalutation}
                    onChange={(e) =>
                      handleInputChange("SpouseSalutation", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Salutation</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                    <option value="Master">Master</option>
                  </select>
                </div>

                {/* Spouse Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    value={formData.SpouseGender}
                    onChange={(e) =>
                      handleInputChange("SpouseGender", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Spouse Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.SpouseDateOfBirth}
                    onChange={(e) =>
                      handleInputChange("SpouseDateOfBirth", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Spouse First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.SpouseFirstName}
                    onChange={(e) =>
                      handleInputChange("SpouseFirstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Spouse Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.SpouseLastName}
                    onChange={(e) =>
                      handleInputChange("SpouseLastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Spouse Maiden Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maiden Name
                  </label>
                  <input
                    type="text"
                    value={formData.SpouseMaidenName}
                    onChange={(e) =>
                      handleInputChange("SpouseMaidenName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Spouse Also Known As */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Also Known As
                  </label>
                  <input
                    type="text"
                    value={formData.SpouseAlsoKnownAs}
                    onChange={(e) =>
                      handleInputChange("SpouseAlsoKnownAs", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Spouse Iwi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Iwi
                  </label>
                  <input
                    type="text"
                    value={formData.SpouseIwi}
                    onChange={(e) =>
                      handleInputChange("SpouseIwi", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Contact Information */}
      {currentStep === 2 && (
        <div>
          <h3 className="text-2xl font-roboto-medium text-gray-800 mb-6">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.PersonalEmail}
                onChange={(e) =>
                  handleInputChange("PersonalEmail", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            {/* Contact Details */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Details
              </label>
              <textarea
                value={formData.PersonalContactDetails}
                onChange={(e) =>
                  handleInputChange("PersonalContactDetails", e.target.value)
                }
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Street address, city, region, postal code"
              />
            </div>

            {/* Postal Address Checkbox */}
            <div className="md:col-span-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.PostalAddress}
                  onChange={(e) =>
                    handleInputChange("PostalAddress", e.target.checked)
                  }
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  I have a different postal address
                </span>
              </label>
            </div>

            {/* Postal Address Details (conditional) */}
            {formData.PostalAddress && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Address *
                </label>
                <textarea
                  value={formData.PostalAddressYes}
                  onChange={(e) =>
                    handleInputChange("PostalAddressYes", e.target.value)
                  }
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="P.O. Box or different postal address"
                  required
                />
              </div>
            )}

            {/* Home Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Phone
              </label>
              <input
                type="tel"
                value={formData.PersonalHomePhone}
                onChange={(e) =>
                  handleInputChange("PersonalHomePhone", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Work Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Phone
              </label>
              <input
                type="tel"
                value={formData.PersonalWorkPhone}
                onChange={(e) =>
                  handleInputChange("PersonalWorkPhone", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Mobile Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Phone
              </label>
              <input
                type="tel"
                value={formData.PersonalMobilePhone}
                onChange={(e) =>
                  handleInputChange("PersonalMobilePhone", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Contact Details */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Contact Details
              </label>
              <textarea
                value={formData.PersonalContactDetails}
                onChange={(e) =>
                  handleInputChange("PersonalContactDetails", e.target.value)
                }
                rows="2"
                placeholder="Any additional contact information or preferences"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Hapu & Iwi Affiliations */}
      {currentStep === 3 && (
        <div>
          <h3 className="text-2xl font-roboto-medium text-gray-800 mb-6">
            Hapū & Iwi Affiliations
          </h3>

          {/* Descendant Affiliation */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Descendant Affiliation *
            </label>
            <div className="space-y-3">
              {descendantAffiliationOptions.map((affiliation) => (
                <label key={affiliation} className="flex items-center">
                  <input
                    type="radio"
                    name="DecendantAffiliation"
                    value={affiliation}
                    checked={formData.DecendantAffiliation === affiliation}
                    onChange={(e) =>
                      handleInputChange("DecendantAffiliation", e.target.value)
                    }
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    {affiliation}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Principal Affiliation */}
            <div className="space-y-4">
              <h4 className="text-lg font-roboto-medium text-emerald-800">
                Principal Affiliation
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Principal Hapū
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {hapuOptions.map((hapu) => (
                    <label key={hapu} className="flex items-center">
                      <input
                        type="radio"
                        name="PrincipleHapu"
                        value={hapu}
                        checked={formData.PrincipleHapu === hapu}
                        onChange={(e) =>
                          handleInputChange("PrincipleHapu", e.target.value)
                        }
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <span className="ml-3 text-sm text-gray-700">{hapu}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Principal Marae
                </label>
                <input
                  type="text"
                  value={formData.PrincipleMarae}
                  onChange={(e) =>
                    handleInputChange("PrincipleMarae", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Principal Iwi Affiliation
                </label>
                <input
                  type="text"
                  value={formData.PrincipleOtherIwiAffiliation}
                  onChange={(e) =>
                    handleInputChange(
                      "PrincipleOtherIwiAffiliation",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Other Affiliation */}
            <div className="space-y-4">
              <h4 className="text-lg font-roboto-medium text-emerald-800">
                Other Affiliations
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Other Hapū
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {hapuOptions.map((hapu) => (
                    <label key={hapu} className="flex items-center">
                      <input
                        type="radio"
                        name="OtherHapu"
                        value={hapu}
                        checked={formData.OtherHapu === hapu}
                        onChange={(e) =>
                          handleInputChange("OtherHapu", e.target.value)
                        }
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <span className="ml-3 text-sm text-gray-700">{hapu}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Marae
                </label>
                <input
                  type="text"
                  value={formData.OtherMarae}
                  onChange={(e) =>
                    handleInputChange("OtherMarae", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Iwi Affiliation
                </label>
                <input
                  type="text"
                  value={formData.OtherIwiAffiliation}
                  onChange={(e) =>
                    handleInputChange("OtherIwiAffiliation", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Genealogy */}
      {currentStep === 4 && (
        <div>
          <h3 className="text-2xl font-roboto-medium text-gray-800 mb-6">
            Genealogical Information (Whakapapa)
          </h3>
          <p className="text-gray-600 mb-8">
            Please provide genealogical details to establish your whakapapa
            connection. Fill in as much information as you can.
          </p>

          {/* Family Tree Visualization */}
          <div className="space-y-8">
            {/* Father's Side */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6">
              <h4 className="text-xl font-roboto-medium text-emerald-800 mb-6 text-center">
                Father's Side (Taha Matua)
              </h4>

              {/* Great-Grandparents Row */}
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-600 mb-3 text-center">
                  Great-Grandparents
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-emerald-300 rounded-lg p-3 shadow-sm">
                    <label className="block text-xs font-medium text-emerald-700 mb-1">
                      Great-Grandfather
                    </label>
                    <input
                      type="text"
                      value={formData.FatherGreatGrandFatherMen}
                      onChange={(e) =>
                        handleInputChange(
                          "FatherGreatGrandFatherMen",
                          e.target.value
                        )
                      }
                      className="w-full text-sm px-2 py-1 border border-emerald-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Name..."
                    />
                  </div>
                  <div className="bg-white border border-emerald-300 rounded-lg p-3 shadow-sm">
                    <label className="block text-xs font-medium text-emerald-700 mb-1">
                      Great-Grandmother
                    </label>
                    <input
                      type="text"
                      value={formData.FatherGreatGrandMotherMen}
                      onChange={(e) =>
                        handleInputChange(
                          "FatherGreatGrandMotherMen",
                          e.target.value
                        )
                      }
                      className="w-full text-sm px-2 py-1 border border-emerald-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Name..."
                    />
                  </div>
                  <div className="bg-white border border-emerald-300 rounded-lg p-3 shadow-sm">
                    <label className="block text-xs font-medium text-emerald-700 mb-1">
                      Great-Grandfather
                    </label>
                    <input
                      type="text"
                      value={formData.FatherGreatGrandFatherWomen}
                      onChange={(e) =>
                        handleInputChange(
                          "FatherGreatGrandFatherWomen",
                          e.target.value
                        )
                      }
                      className="w-full text-sm px-2 py-1 border border-emerald-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Name..."
                    />
                  </div>
                  <div className="bg-white border border-emerald-300 rounded-lg p-3 shadow-sm">
                    <label className="block text-xs font-medium text-emerald-700 mb-1">
                      Great-Grandmother
                    </label>
                    <input
                      type="text"
                      value={formData.FatherGreatGrandMotherWomen}
                      onChange={(e) =>
                        handleInputChange(
                          "FatherGreatGrandMotherWomen",
                          e.target.value
                        )
                      }
                      className="w-full text-sm px-2 py-1 border border-emerald-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Name..."
                    />
                  </div>
                </div>
              </div>

              {/* Connecting Lines */}
              <div className="flex justify-center mb-4">
                <div className="text-emerald-400 text-2xl">↓</div>
              </div>

              {/* Grandparents Row */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
                  <div className="bg-emerald-100 border-2 border-emerald-300 rounded-lg p-4 shadow-sm">
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      Grandfather
                    </label>
                    <input
                      type="text"
                      value={formData.FatherGrandFather}
                      onChange={(e) =>
                        handleInputChange("FatherGrandFather", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-emerald-400 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Grandfather's name..."
                    />
                  </div>
                  <div className="bg-emerald-100 border-2 border-emerald-300 rounded-lg p-4 shadow-sm">
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      Grandmother
                    </label>
                    <input
                      type="text"
                      value={formData.FatherGrandMother}
                      onChange={(e) =>
                        handleInputChange("FatherGrandMother", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-emerald-400 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Grandmother's name..."
                    />
                  </div>
                </div>
              </div>

              {/* Connecting Lines */}
              <div className="flex justify-center mb-4">
                <div className="text-emerald-400 text-2xl">↓</div>
              </div>

              {/* Father */}
              <div className="max-w-xs mx-auto">
                <div className="bg-emerald-200 border-2 border-emerald-400 rounded-lg p-4 shadow-sm">
                  <label className="block text-sm font-medium text-emerald-900 mb-2">
                    Father
                  </label>
                  <input
                    type="text"
                    value={formData.Father}
                    onChange={(e) =>
                      handleInputChange("Father", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-emerald-500 rounded focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Father's name..."
                  />
                </div>
              </div>
            </div>

            {/* Mother's Side */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6">
              <h4 className="text-xl font-roboto-medium text-emerald-800 mb-6 text-center">
                Mother's Side (Taha Whaea)
              </h4>

              {/* Great-Grandparents Row */}
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-600 mb-3 text-center">
                  Great-Grandparents
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-emerald-300 rounded-lg p-3 shadow-sm">
                    <label className="block text-xs font-medium text-emerald-700 mb-1">
                      Great-Grandfather
                    </label>
                    <input
                      type="text"
                      value={formData.MotherGreatGrandFatherMen}
                      onChange={(e) =>
                        handleInputChange(
                          "MotherGreatGrandFatherMen",
                          e.target.value
                        )
                      }
                      className="w-full text-sm px-2 py-1 border border-emerald-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Name..."
                    />
                  </div>
                  <div className="bg-white border border-emerald-300 rounded-lg p-3 shadow-sm">
                    <label className="block text-xs font-medium text-emerald-700 mb-1">
                      Great-Grandmother
                    </label>
                    <input
                      type="text"
                      value={formData.MotherGreatGrandMotherMen}
                      onChange={(e) =>
                        handleInputChange(
                          "MotherGreatGrandMotherMen",
                          e.target.value
                        )
                      }
                      className="w-full text-sm px-2 py-1 border border-emerald-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Name..."
                    />
                  </div>
                  <div className="bg-white border border-emerald-300 rounded-lg p-3 shadow-sm">
                    <label className="block text-xs font-medium text-emerald-700 mb-1">
                      Great-Grandfather
                    </label>
                    <input
                      type="text"
                      value={formData.MotherGreatGrandFatherWomen}
                      onChange={(e) =>
                        handleInputChange(
                          "MotherGreatGrandFatherWomen",
                          e.target.value
                        )
                      }
                      className="w-full text-sm px-2 py-1 border border-emerald-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Name..."
                    />
                  </div>
                  <div className="bg-white border border-emerald-300 rounded-lg p-3 shadow-sm">
                    <label className="block text-xs font-medium text-emerald-700 mb-1">
                      Great-Grandmother
                    </label>
                    <input
                      type="text"
                      value={formData.MotherGreatGrandMotherWomen}
                      onChange={(e) =>
                        handleInputChange(
                          "MotherGreatGrandMotherWomen",
                          e.target.value
                        )
                      }
                      className="w-full text-sm px-2 py-1 border border-emerald-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Name..."
                    />
                  </div>
                </div>
              </div>

              {/* Connecting Lines */}
              <div className="flex justify-center mb-4">
                <div className="text-emerald-400 text-2xl">↓</div>
              </div>

              {/* Grandparents Row */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
                  <div className="bg-emerald-100 border-2 border-emerald-300 rounded-lg p-4 shadow-sm">
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      Grandfather
                    </label>
                    <input
                      type="text"
                      value={formData.MotherGrandFather}
                      onChange={(e) =>
                        handleInputChange("MotherGrandFather", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-emerald-400 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Grandfather's name..."
                    />
                  </div>
                  <div className="bg-emerald-100 border-2 border-emerald-300 rounded-lg p-4 shadow-sm">
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      Grandmother
                    </label>
                    <input
                      type="text"
                      value={formData.MotherGrandMother}
                      onChange={(e) =>
                        handleInputChange("MotherGrandMother", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-emerald-400 rounded focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Grandmother's name..."
                    />
                  </div>
                </div>
              </div>

              {/* Connecting Lines */}
              <div className="flex justify-center mb-4">
                <div className="text-emerald-400 text-2xl">↓</div>
              </div>

              {/* Mother */}
              <div className="max-w-xs mx-auto">
                <div className="bg-emerald-200 border-2 border-emerald-400 rounded-lg p-4 shadow-sm">
                  <label className="block text-sm font-medium text-emerald-900 mb-2">
                    Mother
                  </label>
                  <input
                    type="text"
                    value={formData.Mother}
                    onChange={(e) =>
                      handleInputChange("Mother", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-emerald-500 rounded focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Mother's name..."
                  />
                </div>
              </div>
            </div>

            {/* You (Applicant) */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <div className="text-gray-400 text-2xl">↓</div>
              </div>
              <div className="inline-block bg-emerald-200 border-2 border-emerald-400 rounded-lg p-4">
                <div className="text-emerald-900 font-medium">
                  {formData.PersonalFirstName || "Your"}{" "}
                  {formData.PersonalLastName || "Name"}
                </div>
                <div className="text-emerald-700 text-sm mt-1">
                  Applying for Registration
                </div>
              </div>
            </div>
          </div>

          {/* Helper Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-gray-800 mb-2">
              💡 Tips for completing your whakapapa:
            </h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • Fill in as many names as you know - even partial information
                is helpful
              </li>
              <li>• Include maiden names where known</li>
              <li>• Use traditional Māori names if you know them</li>
              <li>
                • Don't worry if you can't fill everything - we can help
                research missing information
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Step 5: Final Details & Agreement */}
      {currentStep === 5 && (
        <div>
          <h3 className="text-2xl font-roboto-medium text-gray-800 mb-6">
            Additional Information & Agreement
          </h3>

          {/* Additional Information */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea
              value={formData.AdditionalInformation}
              onChange={(e) =>
                handleInputChange("AdditionalInformation", e.target.value)
              }
              rows="4"
              placeholder="Please provide any additional information that may help establish your whakapapa or connection to Ngāti Maru..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Terms Agreement */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-roboto-medium text-emerald-800 mb-4">
              Terms and Conditions
            </h4>
            <div className="text-sm text-emerald-700 space-y-2">
              <p>
                By submitting this registration, I acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  All information provided is true and accurate to the best of
                  my knowledge
                </li>
                <li>
                  My application will undergo an internal validation process by
                  Hapū Representative or Kaumātua
                </li>
                <li>
                  Upon validation, I will become a member of Te Rūnanga o Ngāti
                  Maru Iwi Inc. with all rights and obligations
                </li>
                <li>
                  All information in this application remains confidential to
                  Ngāti Maru
                </li>
                <li>
                  I may be contacted for additional information or clarification
                </li>
              </ul>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="mb-6">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.AgreeToTerms}
                onChange={(e) =>
                  handleInputChange("AgreeToTerms", e.target.checked)
                }
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-1"
                required
              />
              <span className="text-sm text-gray-700">
                I agree to the terms and conditions above and consent to the
                processing of my personal information for registration purposes.
                *
              </span>
            </label>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>Need help with your registration?</strong>
              <br />
              Please call us on <strong>07 867 9104</strong> or email us for
              assistance.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <div className="flex space-x-3">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>

          <button
            onClick={autofillTestData}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            disabled={isSubmitting}
          >
            Autofill Test Data
          </button>
        </div>

        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.AgreeToTerms}
            className={`px-6 py-2 rounded-lg font-medium ${
              isSubmitting || !formData.AgreeToTerms
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
