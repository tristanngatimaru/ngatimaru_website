import React, { useEffect, useState, lazy, Suspense } from "react";
import SubmitReviewButton from "../components/SubmitReviewButton";
import HeroHeader from "../components/header";
import Footer from "@/components/footer";
import FadeInOnLoad from "@/components/loadonstartanimation";
import { getBookingMataiWhetuContent } from "@/api/siteContent";
import { useMataiWhetuForm } from "../hooks/useMataiWhetuForm";
import FadeInSection from "@/components/fadeinanimation";
import { rateLimiter } from "../utils/rateLimiter";

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
const ConfirmModal = lazy(() => import("../components/confirmmodal"));
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
  const [showModal, setShowModal] = useState(false);
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
    // Check rate limiting
    if (!rateLimiter.canSubmit("booking")) {
      const waitTime = rateLimiter.getTimeUntilNextAllowed("booking");
      alert(
        `Please wait ${waitTime} minutes before submitting another booking.`
      );
      return;
    }

    try {
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

      const response = await fetch(
        `${import.meta.env.VITE_STRAPI_API_URL}/api/matai-whetu-applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_FORM_API_TOKEN}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to submit booking:", errorText);
        alert("There was an error submitting the booking. Please try again.");
        return;
      }

      alert("Booking successfully submitted!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
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
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    submitBooking();
  };

  return (
    <div className="w-full">
      <FadeInOnLoad>
        <HeroHeader
          image={content.HeaderSection?.BackgroundHeaderImage?.url}
          title={content.HeaderSection?.TeReoTitle || "Matai Whetu"}
          subtitle={
            content.HeaderSection?.EnglishTitle || "Matai Whetu Booking"
          }
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
              : "none here"}
          </p>
        </FadeInSection>
        <FadeInSection>
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
        </FadeInSection>

        {/* Autofill button */}
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10 grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10">
          <FadeInSection direction="right">
            {/* Main form */}
            <div className="order-2 xl:order-1">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
              >
                <div className="sm:col-span-2">
                  <Suspense fallback={<FormSectionLoader />}>
                    <PersonalDetails
                      formData={formData}
                      handleChange={handleChange}
                      isMissing={isMissing}
                      touchedFields={touchedFields}
                    />
                  </Suspense>
                </div>

                <div className="sm:col-span-2">
                  <Suspense fallback={<FormSectionLoader />}>
                    <OrganisationDetails
                      formData={formData}
                      handleChange={handleChange}
                      isMissing={isMissing}
                      touchedFields={touchedFields}
                    />
                  </Suspense>
                </div>

                <div className="sm:col-span-2">
                  <PersonResponsible
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div className="sm:col-span-2">
                  <BookingDates
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div className="sm:col-span-2">
                  <WharenuiSection
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div className="sm:col-span-2">
                  <WharekaiSection
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div className="sm:col-span-2">
                  <AblutionSection
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Acknowledgements
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FileAcknowledgement
                    formData={formData}
                    handleChange={handleChange}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                    tikangaUrl={content.Tikanga?.url}
                  />
                </div>

                <div className="sm:col-span-2">
                  <SubmitReviewButton
                    isFormComplete={isFormComplete()}
                    onClick={handleSubmit}
                    isMissing={isMissing}
                    touchedFields={touchedFields}
                  />
                </div>

                {missingFields.length > 0 && (
                  <div className="sm:col-span-2 max-w-4xl mx-auto mb-6 md:mb-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
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
            </div>
          </FadeInSection>
          {/* Booking summary */}
          <FadeInSection direction="left">
            <div className="order-1 xl:order-2">
              <div className=" top-4">
                <BookingSummary formData={formData} />
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Confirmation Modal */}
        <ConfirmModal
          show={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
        <Footer />
      </FadeInOnLoad>
    </div>
  );
};

export default MataiWhetu;
