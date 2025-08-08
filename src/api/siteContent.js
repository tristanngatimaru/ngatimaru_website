//siteContent.js

// Form field templates, useful for validation or initial values
export const forms = {
  bookingMataiWhetu: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organisationName: "",
    detailsOfWhanauOrOrganisation: "",
    powhiri: "",
    firstNameResponsible: "",
    lastNameResponsible: "",
    phoneResponsible: "",
    emailResponsible: "",
    bookingPurpose: "",
    bookingFrom: "",
    bookingTo: "",
    firstNameWharenui: "",
    lastNameWharenui: "",
    firstNameWharekai: "",
    lastNameWharekai: "",
    ablutionFirstName: "",
    ablutionLastName: "",
    agreedToTerms: false,
    readTikangaInfoSheet: false,
  },
  fishingPermit: {
    // Add fields here
  },
  registerIwi: {
    // Add fields here
  },
};

// Site content template
export const siteContent = {
  home: {
    headerImage: "",
    header: { collection: "home-page", fieldPath: "HeaderSection.TeReoTitle" },
    mihiIntro: "",
    mihiShortened: "",
    fullMihi: "",
    // Blog posts would be fetched elsewhere
  },
  about: {
    headerImage: "",
    header: "",
    headerEnglish: "",
    Quote: "",
    Info1: "",
    trusteesHeader: "",
    trustees: "",
  },
  bookingMataiWhetu: {
    headerImage: "",
    teReoTitle: "",
    englishTitle: "",
    aboutMataiWhetuTitle: "",
    aboutMataiWhetuContent: "",
  },
  fishingPermit: {
    headerImage: "",
    teReoTitle: "",
    englishTitle: "",
    permitInstructions: "",
  },
  documents: {
    headerImage: "",
    teReoTitle: "",
    englishTitle: "",
  },
  store: {
    headerImage: "",
    header: "TOA",
    headerenglish: "STORE",
  },

  register: {
    headerImage: "",
    header: "RĒHITA",
    headerenglish: "REGISTER",
  },
};
