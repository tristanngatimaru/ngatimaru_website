import React, { useEffect, useState, lazy, Suspense } from "react";
import SubmitReviewButton from "../components/SubmitReviewButton";
import HeroHeader from "../components/header";
import Footer from "@/components/footer";
import FadeInOnLoad from "@/components/loadonstartanimation";
import { getBookingMataiWhetuContent } from "@/api/siteContent";
import { useMataiWhetuForm } from "../hooks/useMataiWhetuForm";
import FadeInSection from "@/components/fadeinanimation";
import { formatTextWithLineBreaks } from "../utils/textFormatter.jsx";

// Lazy load form components
const PersonalDetails = lazy(
  () => import("../components/formSections/PersonalDetails")
);
const OrganisationDetails = lazy(
  () => import("../components/formSections/OrganisationDetails")
);
const PersonResponsible = lazy(
  () => import("../components/formSections/PersonResponsible")
);
const BookingDates = lazy(
  () => import("../components/formSections/BookingDates")
);
const WharenuiSection = lazy(
  () => import("../components/formSections/WharenuiSection")
);
const Acknowledgements = lazy(
  () => import("../components/formSections/Acknowledgement")
);
const BookingSummary = lazy(() => import("../components/bookingsummary"));
const AblutionSection = lazy(
  () => import("../components/formSections/AblutionSection")
);
const WharekaiSection = lazy(
  () => import("../components/formSections/WharekaiSection")
);
const FileAcknowledgement = lazy(
  () => import("../components/formSections/FileAcknowledgement")
);

// Loading component for form sections
const FormSectionLoader = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
    <span className="ml-2 text-sm text-gray-600">Loading...</span>
  </div>
);

// Autofill button that uses your curried handleChange properly
const AutofillTestButton = ({ handleChange }) => {
  const autofillData = {
    firstName: "Hemi",
    lastName: "Ngata",
    phone: "0211234567",
    email: "hemi.ngata@example.com",
    organisationName: "Te Ao Mārama Trust",
    detailsOfWhanauOrOrganisation:
      "Local community trust organising whāfnau wānanga.",
    powhiri: "Yes, we have waewae tapu",
    firstNameResponsible: "Moana",
    lastNameResponsible: "Ranginui",
    phoneResponsible: "0227654321",
    emailResponsible: "moana.r@example.com",
    bookingPurpose: "Whānau reunion and kapa haka wānanga.",
    bookingFrom: "2025-09-15",
    bookingTo: "2025-09-17",
    firstNameWharenui: "Tama",
    lastNameWharenui: "Te Ao",
    firstNameWharekai: "Rangi",
    lastNameWharekai: "Whenua",
    ablutionFirstName: "Aroha",
    ablutionLastName: "Kōwhai",
    agreedToTerms: true,
    readTikangaInfoSheet: false,
  };

  const handleAutofill = () => {
    Object.entries(autofillData).forEach(([key, value]) => {
      handleChange(key)(value);
    });
  };

  return (
    <button
      type="button"
      onClick={handleAutofill}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
    >
      Autofill Test Data
    </button>
  );
};

const MataiWhetu = () => {
  const {
    formData,
    handleChange,
    isMissing,
    isFormComplete,
    touchedFields,
    markAllTouched,
    getMissingFields,
  } = useMataiWhetuForm();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    async function loadContent() {
      try {
        const bookingData = await getBookingMataiWhetuContent();
        setContent(bookingData);
      } catch (err) {
        console.error("Error loading booking content:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading booking content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">
          Error loading booking content. Please try again later.
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No booking content available</div>
      </div>
    );
  }

  const submitBooking = async () => {
    try {
      console.log("🚀 Starting booking submission...");
      console.log("📝 Form data:", formData);

      const payload = {
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          organisationName: formData.organisationName,
          detailsOfWhanauOrOrganisation:
            formData.detailsOfWhanauOrOrganisation || "",
          powhiri: formData.powhiri || "",
          firstNameResponsible: formData.firstNameResponsible || "",
          lastNameResponsible: formData.lastNameResponsible || "",
          phoneResponsible: formData.phoneResponsible || "",
          emailResponsible: formData.emailResponsible || "",
          bookingPurpose: formData.bookingPurpose || "",
          bookingFrom: formData.bookingFrom,
          bookingTo: formData.bookingTo,
          firstNameWharenui: formData.firstNameWharenui || "",
          lastNameWharenui: formData.lastNameWharenui || "",
          firstNameWharekai: formData.firstNameWharekai || "",
          lastNameWharekai: formData.lastNameWharekai || "",
          ablutionFirstName: formData.ablutionFirstName || "",
          ablutionLastName: formData.ablutionLastName || "",
          agreedToTerms: formData.agreedToTerms ? true : false,
          readTikangaInfoSheet: formData.readTikangaInfoSheet ? true : false,
        },
      };

      console.log("📦 Payload:", payload);

      // Use the confirmed endpoint from Postman
      const apiUrl = `${import.meta.env.VITE_STRAPI_API_URL.replace(/\/$/, "")}/api/matai-whetu-applications`;
      console.log("🌐 API URL:", apiUrl);

      // Since public role has create permission, try without auth first
      console.log("🧪 Trying without authentication (public access)...");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response ok:", response.ok);

      if (response.ok) {
        const responseData = await response.json();
        console.log("✅ Booking submitted successfully:", responseData);
        setShowSuccessModal(true);
        return;
      }

      // Handle errors with detailed logging
      let errorData;
      try {
        errorData = await response.json();
        console.error("❌ Error response:", errorData);
      } catch (jsonError) {
        console.error("❌ Could not parse error response:", jsonError.message);
      }

      if (response.status === 403) {
        console.error(
          "❌ 403 Forbidden - even though public role has create permission"
        );
        console.error("📋 Possible causes:");
        console.error(
          "1. Field validation errors (check required fields in Strapi)"
        );
        console.error("2. Content type configuration issues");
        console.error("3. Strapi validation rules not met");

        if (errorData?.error?.details) {
          console.error("📝 Validation details:", errorData.error.details);
        }
        if (errorData?.error?.message) {
          console.error("📝 Error message:", errorData.error.message);
        }

        setSubmitError(
          `Permission denied (403). This might be a field validation issue.\n\nDetails: ${errorData?.error?.message || "Check console for more info"}`
        );
        setShowErrorModal(true);
      } else {
        setSubmitError(
          `Error submitting booking: ${response.status} - ${errorData?.error?.message || "Unknown error"}`
        );
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("❌ Network/fetch error:", error);
      setSubmitError(`Network error: ${error.message}`);
      setShowErrorModal(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormComplete()) {
      markAllTouched();
      const missing = getMissingFields();
      setMissingFields(missing);
      return;
    }

    setMissingFields([]);
    submitBooking();
  };

  return (
    <div className="w-full">
      <FadeInOnLoad>
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
                    Booking Submitted Successfully!
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Your Matai Whetu booking has been received and is being
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
                    Booking Submission Error
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4 whitespace-pre-line">
                {submitError}
              </p>
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

        <HeroHeader
          image={content.HeaderSection?.BackgroundHeaderImage?.url}
          title={content.HeaderSection?.TeReoTitle || "Matai Whetu"}
          subtitle={
            content.HeaderSection?.EnglishTitle || "Matai Whetu Booking"
          }
        />
        <FadeInOnLoad delay={800} mobileDelay={600}>
          <p className="text-lg text-gray-700 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-96 pt-10 md:pt-20 font-roboto-light text-center">
            {content.Content
              ? formatTextWithLineBreaks(content.Content)
              : "none here"}
          </p>
        </FadeInOnLoad>
        <FadeInOnLoad delay={1000} mobileDelay={800}>
          <div className="w-full flex justify-center items-center py-6 md:py-8 px-4">
            <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 flex flex-col items-center">
              <h2 className="text-xl md:text-2xl font-roboto-bold text-emerald-800 mb-4 text-center">
                Booking Instructions
              </h2>
              <p className="text-gray-700 text-base md:text-lg text-center leading-relaxed font-roboto-light">
                Please answer the questions below to the best of your ability.
                If you have any questions or are unsure, feel free to contact
                Ngāti Maru at (07) 867 9104.
              </p>
            </div>
          </div>
        </FadeInOnLoad>
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10 grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10">
          {/* Main form - Left side on desktop */}
          <div className="xl:col-start-1">
            <FadeInSection direction="left">
              {/* Autofill button */}
              <div className="mb-6">
                <AutofillTestButton handleChange={handleChange} />
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 md:gap-5"
              >
                <div>
                  <Suspense fallback={<FormSectionLoader />}>
                    <PersonalDetails
                      formData={formData}
                      handleChange={handleChange}
                      isMissing={isMissing}
                      touchedFields={touchedFields}
                    />
                  </Suspense>
                </div>

                <div>
                  <Suspense fallback={<FormSectionLoader />}>
                    <OrganisationDetails
                      formData={formData}
                      handleChange={handleChange}
                      isMissing={isMissing}
                      touchedFields={touchedFields}
                    />
                  </Suspense>
                </div>

                <div>
                  <PersonResponsible
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div>
                  <BookingDates
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div>
                  <WharenuiSection
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div>
                  <WharekaiSection
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div>
                  <AblutionSection
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div>
                  <Acknowledgements
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div>
                  <FileAcknowledgement
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                    tikangaUrl={content.Tikanga?.url}
                  />
                </div>

                <div>
                  <SubmitReviewButton
                    isFormComplete={isFormComplete()}
                    onClick={handleSubmit}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                {missingFields.length > 0 && (
                  <div className="max-w-4xl mx-auto mb-6 md:mb-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong className="font-bold">
                      Please complete the following fields:
                    </strong>
                    <ul className="list-disc ml-5 mt-2">
                      {missingFields.map((field, idx) => (
                        <li key={idx}>{field}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>
            </FadeInSection>
          </div>

          {/* Booking summary - Right side on desktop */}
          <div className="xl:col-start-2">
            <FadeInSection direction="right">
              <div className="sticky top-4">
                <BookingSummary formData={formData} />
              </div>
            </FadeInSection>
          </div>
        </div>

        <Footer />
      </FadeInOnLoad>
    </div>
  );
};

export default MataiWhetu;
