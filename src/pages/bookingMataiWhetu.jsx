// --------------------------
// src/pages/MataiWhetu.jsx
// --------------------------

import React, { useState } from "react";

import SubmitReviewButton from "../components/SubmitReviewButton";
import PersonalDetails from "../components/formSections/PersonalDetails";
import OrganisationDetails from "../components/formSections/OrganisationDetails";
import PersonResponsible from "../components/formSections/PersonResponsible";
import BookingDates from "../components/formSections/BookingDates";
import WharenuiSection from "../components/formSections/WharenuiSection";
import Acknowledgements from "../components/formSections/Acknowledgement";
import BookingSummary from "../components/BookingSummary";
import ConfirmModal from "../components/ConfirmModal";
import AblutionSection from "../components/formSections/AblutionSection";
import WharekaiSection from "../components/formSections/WharekaiSection";
import { useMataiWhetuForm } from "../hooks/useMataiWhetuForm";
import HeroHeader from "../components/header";
import { Images } from "../components/sitecontent/images";
import content from "../components/sitecontent/content";
import FileAcknowledgement from "../components/formSections/FileAcknowledgement";

// Autofill button that uses your curried handleChange properly
const AutofillTestButton = ({ handleChange }) => {
  const autofillData = {
    firstName: "Hemi",
    lastName: "Ngata",
    phone: "0211234567",
    email: "hemi.ngata@example.com",
    organisationName: "Te Ao Mārama Trust",
    detailsOfWhanauOrOrganisation:
      "Local community trust organising whānau wānanga.",
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
    readTikangaInfoSheet: true,
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

  const [showModal, setShowModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  const submitBooking = async () => {
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
        "http://localhost:1337/api/matai-whetu-applications",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
      <div className="w-full h-50 bg-gradient-to-b from-gray-800 to-transparent absolute z-10"></div>
      <HeroHeader
        image={Images.MataiWhetu}
        subtitle={content.mataiwhetu.header}
        title={content.mataiwhetu.headerenglish}
      />

      {/* Autofill button */}
      <div className="w-full p-20 grid lg:grid-cols-2 gap-10">
        <div className="col-span-2">
          <AutofillTestButton handleChange={handleChange} />
        </div>

        {/* Main form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5 col-span-1"
        >
          <div className="col-span-2">
            <PersonalDetails
              formData={formData}
              handleChange={handleChange}
              isMissing={isMissing}
              touchedFields={touchedFields}
            />
          </div>

          <div className="col-span-2">
            <OrganisationDetails
              formData={formData}
              handleChange={handleChange}
              isMissing={isMissing}
              touchedFields={touchedFields}
            />
          </div>

          <div className="col-span-2">
            <PersonResponsible
              formData={formData}
              handleChange={handleChange}
              isMissing={isMissing}
              touchedFields={touchedFields}
            />
          </div>

          <div className="col-span-2">
            <BookingDates
              formData={formData}
              handleChange={handleChange}
              isMissing={isMissing}
              touchedFields={touchedFields}
            />
          </div>

          <div className="col-span-2">
            <WharenuiSection
              formData={formData}
              handleChange={handleChange}
              isMissing={isMissing}
              touchedFields={touchedFields}
            />
          </div>

          <div className="col-span-2">
            <WharekaiSection
              formData={formData}
              handleChange={handleChange}
              isMissing={isMissing}
              touchedFields={touchedFields}
            />
          </div>

          <div className="col-span-2">
            <AblutionSection
              formData={formData}
              handleChange={handleChange}
              isMissing={isMissing}
              touchedFields={touchedFields}
            />
          </div>

          <div className="col-span-2">
            <Acknowledgements
              formData={formData}
              handleChange={handleChange}
              isMissing={isMissing}
              touchedFields={touchedFields}
            />
          </div>

          <div className="col-span-2">
            <FileAcknowledgement
              formData={formData}
              handleChange={handleChange}
              isMissing={isMissing}
              touchedFields={touchedFields}
            />
          </div>

          <SubmitReviewButton
            isFormComplete={isFormComplete()}
            onClick={handleSubmit}
            isMissing={isMissing}
            touchedFields={touchedFields}
          />

          {missingFields.length > 0 && (
            <div className="col-span-2 max-w-4xl mx-auto mb-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
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

        {/* Booking summary */}
        <div className="col-span-1">
          <BookingSummary formData={formData} />
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default MataiWhetu;
