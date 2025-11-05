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
    PurposeForHui: "",
    NumberAttending: "",
    ToBeUsedAt: "",
    ToBeUsedWhen: "",
    VenueContactNumber: "",
    TimeOfHarvest: "",

    // Harvesters - array of harvester objects
    Harvesters: [
      {
        FirstName: "",
        LastName: "",
      },
    ],

    // Species - array of species objects
    Species: [
      {
        SpeciesName: "",
        HarvestMethodDrop: "",
        AreaTaken: "",
        AreaLanded: "",
        AmountRequested: "",
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

  const handleHarvesterChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      Harvesters: prev.Harvesters.map((harvester, i) =>
        i === index ? { ...harvester, [field]: value } : harvester
      ),
    }));
  };

  const addHarvester = () => {
    setFormData((prev) => ({
      ...prev,
      Harvesters: [
        ...prev.Harvesters,
        {
          FirstName: "",
          LastName: "",
        },
      ],
    }));
  };

  const removeHarvester = (index) => {
    if (formData.Harvesters.length > 1) {
      setFormData((prev) => ({
        ...prev,
        Harvesters: prev.Harvesters.filter((_, i) => i !== index),
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
          HarvestMethodDrop: "",
          AreaTaken: "",
          AreaLanded: "",
          AmountRequested: "",
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
    if (!formData.PurposeForHui.trim())
      newErrors.PurposeForHui = "Purpose for hui is required";
    if (!formData.NumberAttending.trim())
      newErrors.NumberAttending = "Number attending is required";
    if (!formData.ToBeUsedAt.trim())
      newErrors.ToBeUsedAt = "Venue/location is required";
    if (!formData.ToBeUsedWhen) newErrors.ToBeUsedWhen = "Date is required";
    if (!formData.VenueContactNumber.trim())
      newErrors.VenueContactNumber = "Venue contact number is required";
    if (!formData.TimeOfHarvest)
      newErrors.TimeOfHarvest = "Time of harvest is required";

    // Validate harvesters
    formData.Harvesters.forEach((harvester, index) => {
      if (!harvester.FirstName.trim()) {
        newErrors[`Harvesters_${index}_FirstName`] = "First name is required";
      }
      if (!harvester.LastName.trim()) {
        newErrors[`Harvesters_${index}_LastName`] = "Last name is required";
      }
    });

    // Validate species
    formData.Species.forEach((species, index) => {
      if (!species.SpeciesName.trim()) {
        newErrors[`Species_${index}_SpeciesName`] = "Species name is required";
      }
      if (!species.HarvestMethodDrop.trim()) {
        newErrors[`Species_${index}_HarvestMethodDrop`] =
          "Harvest method is required";
      }
      if (!species.AreaTaken.trim()) {
        newErrors[`Species_${index}_AreaTaken`] = "Area taken is required";
      }
      if (!species.AreaLanded.trim()) {
        newErrors[`Species_${index}_AreaLanded`] = "Area landed is required";
      }
      if (!species.AmountRequested || species.AmountRequested <= 0) {
        newErrors[`Species_${index}_AmountRequested`] =
          "Amount requested is required and must be greater than 0";
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
      PurposeForHui: "",
      NumberAttending: "",
      ToBeUsedAt: "",
      ToBeUsedWhen: "",
      VenueContactNumber: "",
      TimeOfHarvest: "",
      Harvesters: [
        {
          FirstName: "",
          LastName: "",
        },
      ],
      Species: [
        {
          SpeciesName: "",
          HarvestMethodDrop: "",
          AreaTaken: "",
          AreaLanded: "",
          AmountRequested: "",
        },
      ],
    });
    setErrors({});
  };

  return {
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
  };
};
