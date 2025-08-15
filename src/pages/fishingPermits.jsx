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
  const [submitSuccess, setSubmitSuccess] = useState(false);
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
  } = useFishingPermitForm();

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
      // Prepare the data according to Strapi API format
      const apiData = {
        data: {
          ...formData,
          // Convert datetime-local to ISO string for TimeOfHarves
          Species: formData.Species.map((species) => ({
            ...species,
            TimeOfHarves: species.TimeOfHarves
              ? new Date(species.TimeOfHarves).toISOString()
              : null,
          })),
        },
      };

      const response = await fetch(
        "http://localhost:1337/api/fishing-permit-applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Application submission failed: ${errorData}`);
      }

      await response.json();

      setSubmitSuccess(true);
      resetForm();

      // Show success message for 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Error submitting fishing permit application:", err);
      setSubmitError(
        err.message || "Failed to submit application. Please try again."
      );
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
        <FadeInSection>
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
        </FadeInSection>
        <FadeInSection>
          {" "}
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
        </FadeInSection>
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10">
          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-bold">Application Submitted Successfully!</p>
              <p>
                Your fishing permit application has been received and is being
                processed.
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p className="font-bold">Submission Error</p>
              <p>{submitError}</p>
            </div>
          )}

          {/* Main form */}
          <FadeInSection>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10"
            >
              <div className="lg:col-span-1">
                <FishingPersonalDetails
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>

              <div className="lg:col-span-1">
                <FishingPurposeDetails
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>

              <div className="lg:col-span-2">
                <FishingSpeciesDetails
                  formData={formData}
                  handleSpeciesChange={handleSpeciesChange}
                  addSpecies={addSpecies}
                  removeSpecies={removeSpecies}
                  errors={errors}
                />
              </div>

              {/* Submit Button */}
              <div className="lg:col-span-2 flex flex-col sm:flex-row justify-end mt-6 md:mt-10 space-y-3 sm:space-y-0 sm:space-x-4">
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
          </FadeInSection>
        </div>

        <Footer />
      </FadeInOnLoad>
    </div>
  );
}

export default Fishing;
