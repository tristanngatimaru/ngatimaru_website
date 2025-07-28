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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormComplete) {
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
    alert("Booking submitted!");
    // send to email or WordPress endpoint here
  };

  return (
    <div className="w-full">
      <div className="w-full h-50 bg-gradient-to-b from-gray-800 to-transparent absolute z-10"></div>
      <HeroHeader
        image={Images.MataiWhetu}
        subtitle={content.mataiwhetu.header}
        title={content.mataiwhetu.headerenglish}
      />

      {/* Main form + summary container */}
      <div className="w-full p-20 grid lg:grid-cols-2 gap-10">
        {/* Left column: Form */}
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
            isFormComplete={isFormComplete}
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

        {/* Right: Booking summary */}
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
