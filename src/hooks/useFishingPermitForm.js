import { useState } from "react";

export const useFishingPermitForm = () => {
  const [formData, setFormData] = useState({
    // Personal Details
    ApplyingUnderMaoriRights: false,
    IwiClaim: "",
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    PhoneNumber: "",
    StreetAddress: "",

    // Fishing Purpose
    PurposeForFishing: false,
    NumberAttending: "",
    ToBeUsedAt: "",
    ToBeUsedWhen: "",
    VenueContactNumber: "",

    // Species - array of species objects
    Species: [
      {
        SpeciesName: "",
        HarvestMethod: "",
        AreaTaken: "",
        AreaLanded: "",
        TimeOfHarves: "",
      },
    ],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleSpeciesChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      Species: prev.Species.map((species, i) =>
        i === index ? { ...species, [field]: value } : species
      ),
    }));
  };

  const addSpecies = () => {
    setFormData((prev) => ({
      ...prev,
      Species: [
        ...prev.Species,
        {
          SpeciesName: "",
          HarvestMethod: "",
          AreaTaken: "",
          AreaLanded: "",
          TimeOfHarves: "",
        },
      ],
    }));
  };

  const removeSpecies = (index) => {
    if (formData.Species.length > 1) {
      setFormData((prev) => ({
        ...prev,
        Species: prev.Species.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required personal fields
    if (!formData.FirstName.trim())
      newErrors.FirstName = "First name is required";
    if (!formData.LastName.trim()) newErrors.LastName = "Last name is required";
    if (!formData.EmailAddress.trim())
      newErrors.EmailAddress = "Email address is required";
    if (!formData.PhoneNumber.trim())
      newErrors.PhoneNumber = "Phone number is required";
    if (!formData.StreetAddress.trim())
      newErrors.StreetAddress = "Street address is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.EmailAddress && !emailRegex.test(formData.EmailAddress)) {
      newErrors.EmailAddress = "Please enter a valid email address";
    }

    // Required fishing purpose fields
    if (!formData.NumberAttending.trim())
      newErrors.NumberAttending = "Number attending is required";
    if (!formData.ToBeUsedAt.trim())
      newErrors.ToBeUsedAt = "Venue/location is required";
    if (!formData.ToBeUsedWhen) newErrors.ToBeUsedWhen = "Date is required";
    if (!formData.VenueContactNumber.trim())
      newErrors.VenueContactNumber = "Venue contact number is required";

    // Validate species
    formData.Species.forEach((species, index) => {
      if (!species.SpeciesName.trim()) {
        newErrors[`Species_${index}_SpeciesName`] = "Species name is required";
      }
      if (!species.HarvestMethod.trim()) {
        newErrors[`Species_${index}_HarvestMethod`] =
          "Harvest method is required";
      }
      if (!species.AreaTaken.trim()) {
        newErrors[`Species_${index}_AreaTaken`] = "Area taken is required";
      }
      if (!species.AreaLanded.trim()) {
        newErrors[`Species_${index}_AreaLanded`] = "Area landed is required";
      }
      if (!species.TimeOfHarves) {
        newErrors[`Species_${index}_TimeOfHarves`] =
          "Time of harvest is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      ApplyingUnderMaoriRights: false,
      IwiClaim: "",
      FirstName: "",
      LastName: "",
      EmailAddress: "",
      PhoneNumber: "",
      StreetAddress: "",
      PurposeForFishing: false,
      NumberAttending: "",
      ToBeUsedAt: "",
      ToBeUsedWhen: "",
      VenueContactNumber: "",
      Species: [
        {
          SpeciesName: "",
          HarvestMethod: "",
          AreaTaken: "",
          AreaLanded: "",
          TimeOfHarves: "",
        },
      ],
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    handleSpeciesChange,
    addSpecies,
    removeSpecies,
    validateForm,
    resetForm,
  };
};
