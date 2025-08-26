import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import HeroHeader from "../components/header";
import { getFishingPermitContent } from "@/api/siteContent";
import { useFishingPermitForm } from "../hooks/useFishingPermitForm";
import FishingPersonalDetails from "../components/formSections/FishingPersonalDetails";
import FishingPurposeDetails from "../components/formSections/FishingPurposeDetails";
import FishingSpeciesDetails from "../components/formSections/FishingSpeciesDetails";
import FadeInOnLoad from "@/components/loadonstartanimation";
import FadeInSection from "@/components/fadeinanimation";

function Fishing() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    formData,
    errors,
    handleChange,
    handleSpeciesChange,
    addSpecies,
    removeSpecies,
    validateForm,
    resetForm,
    setFormData,
  } = useFishingPermitForm();

  // Autofill function for testing
  const autofillTestData = () => {
    const testData = {
      ApplyingUnderMaoriRights: true,
      IwiClaim: "Test Iwi Claim for Testing Purposes",
      FirstName: "John",
      LastName: "Tester",
      EmailAddress: "john.tester@example.com",
      PhoneNumber: "021 123 4567",
      StreetAddress: "123 Test Street, Test Town, 1234",
      PurposeForFishing: true,
      NumberAttending: "5",
      ToBeUsedAt: "Community Marae",
      ToBeUsedWhen: "2025-09-15",
      VenueContactNumber: "07 867 9104",
      Species: [
        {
          SpeciesName: "Snapper",
          HarvestMethod: "Rod and Line",
          AreaTaken: "Coromandel Peninsula Waters",
          AreaLanded: "Mercury Bay",
          TimeOfHarves: "2025-09-15T08:00",
        },
        {
          SpeciesName: "Kahawai",
          HarvestMethod: "Net",
          AreaTaken: "Thames Estuary",
          AreaLanded: "Thames Wharf",
          TimeOfHarves: "2025-09-15T14:00",
        },
      ],
    };

    // Set the entire form data with test values
    setFormData(testData);
  };

  useEffect(() => {
    async function loadContent() {
      try {
        const fishingData = await getFishingPermitContent();
        setContent(fishingData);
      } catch (err) {
        console.error("Error loading fishing permit content:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      console.log("🚀 Starting fishing permit submission...");
      console.log("📝 Form data:", formData);

      // Prepare the data according to Strapi API format
      const payload = {
        data: {
          ApplyingUnderMaoriRights: formData.ApplyingUnderMaoriRights
            ? true
            : false,
          IwiClaim: formData.IwiClaim || "",
          FirstName: formData.FirstName,
          LastName: formData.LastName,
          EmailAddress: formData.EmailAddress,
          PhoneNumber: formData.PhoneNumber,
          StreetAddress: formData.StreetAddress,
          PurposeForFishing: formData.PurposeForFishing ? true : false,
          NumberAttending: formData.NumberAttending,
          ToBeUsedAt: formData.ToBeUsedAt,
          ToBeUsedWhen: formData.ToBeUsedWhen,
          VenueContactNumber: formData.VenueContactNumber,
          // Convert datetime-local to ISO string for TimeOfHarves
          Species: formData.Species.map((species) => ({
            ...species,
            TimeOfHarves: species.TimeOfHarves
              ? new Date(species.TimeOfHarves).toISOString()
              : null,
          })),
        },
      };

      console.log("📦 Payload:", payload);

      // Use environment variable for API URL
      const apiUrl = `${import.meta.env.VITE_STRAPI_API_URL.replace(/\/$/, "")}/api/fishing-permit-applications`;
      console.log("🌐 API URL:", apiUrl);

      console.log("🧪 Trying fishing permit submission...");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error response:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ Success response:", result);

      setShowSuccessModal(true);
      resetForm();
    } catch (err) {
      console.error("💥 Error submitting fishing permit application:", err);
      setSubmitError(
        err.message || "Failed to submit application. Please try again."
      );
      setShowErrorModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading fishing permit content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error loading fishing permit content. Please try again later.
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No fishing permit content available</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <FadeInOnLoad>
        <HeroHeader
          image={content.HeaderSection?.BackgroundHeaderImage?.url}
          title={content.HeaderSection?.TeReoTitle || "Fishing Permits"}
          subtitle={content.HeaderSection?.EnglishTitle || "Fishing Permits"}
        />
        <FadeInOnLoad delay={800} mobileDelay={600}>
          <p className="text-lg text-gray-700 px-4 sm:px-8 md:px-12 lg:px-20 pt-10 md:pt-20 font-roboto-light text-center">
            {content.Content
              ? (() => {
                  const sentences = content.Content.split(".")
                    .map((s) => s.trim())
                    .filter(Boolean);
                  const groups = [];
                  for (let i = 0; i < sentences.length; i += 3) {
                    groups.push(
                      sentences.slice(i, i + 3).join(". ") +
                        (i + 3 < sentences.length ? "." : "")
                    );
                  }
                  return groups.map((group, idx) => (
                    <span key={idx}>
                      {group}
                      <br />
                      <br />
                    </span>
                  ));
                })()
              : "Fishing permit information will be displayed here."}
          </p>
        </FadeInOnLoad>
        <FadeInOnLoad delay={1000} mobileDelay={800}>
          <div className="w-full flex justify-center items-center py-6 md:py-8 px-4">
            <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 flex flex-col items-center">
              <h2 className="text-xl md:text-2xl font-roboto-bold text-emerald-800 mb-4 text-center">
                Application Instructions
              </h2>
              <p className="text-gray-700 text-base md:text-lg text-center leading-relaxed font-roboto-light">
                Please complete the fishing permit application below. If you
                have any questions or need assistance, feel free to contact
                Ngāti Maru at (07) 867 9104.
              </p>
            </div>
          </div>
        </FadeInOnLoad>
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10">
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
                      Application Submitted Successfully!
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Your fishing permit application has been received and is being
                  processed.
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
                      Submission Error
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

          {/* Main form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10"
          >
            <FadeInSection direction="right">
              <div className="lg:col-span-1">
                <FishingPersonalDetails
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>
            </FadeInSection>
            <FadeInSection direction="left">
              <div className="lg:col-span-1">
                <FishingPersonalDetails
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>
            </FadeInSection>
            <FadeInSection direction="right">
              <div className="lg:col-span-1">
                <FishingPurposeDetails
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>
            </FadeInSection>

            <div className="lg:col-span-2">
              <FadeInSection>
                <FishingSpeciesDetails
                  formData={formData}
                  handleSpeciesChange={handleSpeciesChange}
                  addSpecies={addSpecies}
                  removeSpecies={removeSpecies}
                  errors={errors}
                />
              </FadeInSection>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-2 flex flex-col sm:flex-row justify-end mt-6 md:mt-10 space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={autofillTestData}
                className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                disabled={submitting}
              >
                Autofill Test Data
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                disabled={submitting}
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>

        <Footer />
      </FadeInOnLoad>
    </div>
  );
}

export default Fishing;
