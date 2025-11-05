import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import HeroHeader from "../components/header";
import { getFishingPermitContent } from "@/api/siteContent";
import { useFishingPermitForm } from "../hooks/useFishingPermitForm";
import FishingPersonalDetails from "../components/formSections/FishingPersonalDetails";
import FishingPurposeDetails from "../components/formSections/FishingPurposeDetails";
import FishingHarvesters from "../components/formSections/FishingHarvesters";
import FishingSpeciesDetails from "../components/formSections/FishingSpeciesDetails";
import FadeInOnLoad from "@/components/loadonstartanimation";
import FadeInSection from "@/components/fadeinanimation";
import { formatTextWithLineBreaks } from "../utils/textFormatter.jsx";

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
    handleHarvesterChange,
    addHarvester,
    removeHarvester,
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
      PurposeForHui:
        "This hui is for our annual whānau gathering where we will share traditional kai moana with our community. The harvested seafood will be prepared using customary methods and shared among 50+ whānau members to celebrate our cultural heritage and strengthen our connection to the moana.",
      NumberAttending: "5",
      ToBeUsedAt: "Community Marae",
      ToBeUsedWhen: "2025-12-15",
      VenueContactNumber: "07 867 9104",
      TimeOfHarvest: "2025-12-15T08:00",
      Harvesters: [
        {
          FirstName: "John",
          LastName: "Tester",
        },
        {
          FirstName: "Jane",
          LastName: "Smith",
        },
      ],
      Species: [
        {
          SpeciesName: "Snapper",
          HarvestMethodDrop: "Rod and Line",
          AreaTaken: "Coromandel Peninsula Waters",
          AreaLanded: "Mercury Bay",
        },
        {
          SpeciesName: "Kahawai",
          HarvestMethodDrop: "Net",
          AreaTaken: "Thames Estuary",
          AreaLanded: "Thames Wharf",
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
      // Prepare the data according to Strapi API format
      const payload = {
        data: {
          ApplyingUnderMaoriRights: formData.ApplyingUnderMaoriRights,
          IwiClaim: formData.IwiClaim || "",
          FirstName: formData.FirstName,
          LastName: formData.LastName,
          EmailAddress: formData.EmailAddress,
          PhoneNumber: formData.PhoneNumber,
          StreetAddress: formData.StreetAddress,
          PurposeForHui: formData.PurposeForHui,
          NumberAttending: formData.NumberAttending,
          ToBeUsedAt: formData.ToBeUsedAt,
          ToBeUsedWhen: formData.ToBeUsedWhen,
          VenueContactNumber: formData.VenueContactNumber,
          TimeOfHarvest: formData.TimeOfHarvest
            ? new Date(formData.TimeOfHarvest).toISOString()
            : null,
          // Format Harvesters as repeatable component
          Harvesters: formData.Harvesters.map((harvester) => ({
            FirstName: harvester.FirstName,
            LastName: harvester.LastName,
          })),
          // Format Species as repeatable component
          Species: formData.Species.map((species) => ({
            SpeciesName: species.SpeciesName,
            HarvestMethodDrop: species.HarvestMethodDrop,
            AreaTaken: species.AreaTaken,
            AreaLanded: species.AreaLanded,
          })),
        },
      };

      const apiUrl = `${import.meta.env.VITE_STRAPI_API_URL.replace(/\/$/, "")}/api/fishing-permit-applications`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Strapi API Error:", errorData);
        throw new Error(
          `Submission failed: ${errorData.error?.message || response.statusText}`
        );
      }

      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error.message || "Failed to submit application. Please try again."
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-10 md:pt-20 pb-10">
            <p className="text-lg text-gray-700 font-roboto-light text-center">
              {content.Content
                ? formatTextWithLineBreaks(content.Content)
                : "Fishing permit information will be displayed here."}
            </p>
          </div>
        </FadeInOnLoad>
        <FadeInOnLoad delay={1000} mobileDelay={800}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 flex flex-col items-center">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">
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
                <FishingPurposeDetails
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>
            </FadeInSection>

            <div className="lg:col-span-2">
              <FadeInSection>
                <FishingHarvesters
                  formData={formData}
                  handleHarvesterChange={handleHarvesterChange}
                  addHarvester={addHarvester}
                  removeHarvester={removeHarvester}
                  errors={errors}
                />
              </FadeInSection>
            </div>

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
