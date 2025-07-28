import { useState, useEffect } from "react";

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
    readTikangaInfoSheet: false, // renamed here
  });

  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    console.log("FormData changed:", formData);
  }, [formData]);

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
      wharenui: "Wharenui",

      agreedToTerms: "Acknowledgement Checkbox",
      readTikangaInfoSheet: "Tikanga Info Sheet Agreement", // renamed here too
    };

    return Object.entries(labels)
      .filter(([key]) => isMissing(key))
      .map(([_, label]) => label);
  };

  // Updated to handle events for input and checkbox correctly
  const handleChange = (key) => (eOrValue) => {
    let value;
    if (eOrValue && eOrValue.target) {
      // Called from an event
      value =
        eOrValue.target.type === "checkbox"
          ? eOrValue.target.checked
          : eOrValue.target.value;
    } else {
      // Called directly with value (e.g., onChange("some text"))
      value = eOrValue;
    }
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return {
    formData,
    handleChange,
    isMissing,
    isFormComplete: getMissingFields().length === 0,
    getMissingFields,
    touchedFields,
    markAllTouched,
  };
};
