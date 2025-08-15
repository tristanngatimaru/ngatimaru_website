import { useState } from "react";

export const useMataiWhetuForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organisationName: "",
    personResponsible: "",
    bookingFrom: "",
    bookingTo: "",
    wharenui: "",
    wharekai: "",
    ablutionBlock: "",
    agreedToTerms: false,
    readTikangaInfoSheet: false,

    // Added missing fields:
    firstNameResponsible: "",
    lastNameResponsible: "",
    phoneResponsible: "",
    emailResponsible: "",
    bookingPurpose: "",
    firstNameWharenui: "",
    lastNameWharenui: "",
    firstNameWharekai: "",
    lastNameWharekai: "",
    ablutionFirstName: "",
    ablutionLastName: "",
  });

  const [touchedFields, setTouchedFields] = useState({});

  const isMissing = (key) =>
    formData[key] === "" || formData[key] === false || formData[key] == null;

  const markAllTouched = () => {
    const touched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouchedFields(touched);
  };

  const getMissingFields = () => {
    const labels = {
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone Number",
      email: "Email Address",
      organisationName: "Organisation Name",

      bookingFrom: "Booking From Date",
      bookingTo: "Booking To Date",

      agreedToTerms: "Acknowledgement Checkbox",
      readTikangaInfoSheet: "Tikanga Info Sheet Agreement",

      firstNameResponsible: "First Name Responsible",
      lastNameResponsible: "Last Name Responsible",
      phoneResponsible: "Phone Responsible",
      emailResponsible: "Email Responsible",
      bookingPurpose: "Booking Purpose",
      firstNameWharenui: "First Name Wharenui",
      lastNameWharenui: "Last Name Wharenui",
      firstNameWharekai: "Wharekai First Name",
      lastNameWharekai: "Wharekai Last Name",
      ablutionFirstName: "Ablution First Name",
      ablutionLastName: "Ablution Last Name",
    };

    return Object.entries(labels)
      .filter(([key]) => isMissing(key))
      .map(([, label]) => label);
  };

  const handleChange = (key) => (eOrValue) => {
    let value;
    if (eOrValue && eOrValue.target) {
      value =
        eOrValue.target.type === "checkbox"
          ? eOrValue.target.checked
          : eOrValue.target.value;
    } else {
      value = eOrValue;
    }
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return {
    formData,
    handleChange,
    isMissing,
    isFormComplete: () => getMissingFields().length === 0,
    getMissingFields,
    touchedFields,
    markAllTouched,
  };
};
