this code i'm going to put in, is it too much in one file, should i be refactoring this or putting more parts into components??


import Footer from "../components/footer";
import HeroHeader from "../components/header";
import content from "../components/sitecontent/content";
import { Images } from "../components/sitecontent/images";
import FormComponent from "../components/formcomponent";
import { useState } from "react";

function MataiWhetu() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organisationName: "",
    purpose: "",
    bookingFrom: "",
    bookingTo: "",
    acknowledgesNoAlcohol: false,
    acknowledgesNoPhotos: false,
    acknowledgesNoFood: false,
    acknowledgesSmokingArea: false,
  });

  const [formTouched, setFormTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [readFile, setReadFile] = useState(false);

  // Define which fields are required
  const requiredFieldsMap = {
    firstName: true,
    lastName: true,
    organisationName: true,
    organisationDetails: false,
    phone: true,
    email: true,
    powhiri: false,
    responsibleFirstName: false,
    responsibleLastName: false,
    responsiblePhone: false,
    responsibleEmail: false,
    purpose: true,
    bookingFrom: false,
    bookingTo: false,
    wharenuiFirstName: true,
    wharenuiLastName: true,
    wharekaiFirstName: false,
    wharekaiLastName: false,
    ablutionFirstName: false,
    ablutionLastName: false,
    readTikangaInfoSheet: true,
  };
  // Handle field change
  const handleChange = (fieldName) => (value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setFormTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  // Check for missing fields
  const isMissing = (key) => {
    return (
      requiredFieldsMap[key] &&
      (!formData[key] || formData[key].toString().trim() === "") &&
      (formTouched[key] || formSubmitted)
    );
  };

  // Called when user clicks "Book Now"
  const validateBeforeSubmit = () => {
    setFormSubmitted(true);

    const hasErrors = Object.entries(requiredFieldsMap).some(
      ([field, isRequired]) =>
        isRequired &&
        (!formData[field] || formData[field].toString().trim() === "")
    );

    const allAcknowledged =
      formData.acknowledgesNoAlcohol &&
      formData.acknowledgesNoPhotos &&
      formData.acknowledgesNoFood &&
      formData.acknowledgesSmokingArea;

    if (hasErrors || !allAcknowledged) return;

    setShowConfirm(true);
  };

  // Final send
  const handleSubmit = () => {
    // Replace this with your actual sending logic (e.g. email)
    alert("Form submitted!");
    setShowConfirm(false);
  };

  return (
    <div className="w-full">
      <div className="w-full h-50 bg-gradient-to-b from-gray-800 to-transparent absolute z-10"></div>
      <HeroHeader
        image={Images.MataiWhetu}
        subtitle={content.mataiwhetu.header}
        title={content.mataiwhetu.headerenglish}
      />
      <div className="flex-col lg:grid lg:grid-cols-2 p-20 gap-10">
        <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <div>
            <FormComponent
              id="FirstName"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange("firstName")}
              placeholder="First Name Here"
              required={true}
              type="text"
            />
          </div>
          <div>
            <FormComponent
              id="LastName"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange("lastName")}
              placeholder="Last Name Here"
              required={true}
              type="text"
            />
          </div>
          <div className="col-span-2">
            <FormComponent
              id="OrganisationName"
              label="Whānau or Organisation Name"
              name="organisationName"
              value={formData.organisationName}
              onChange={handleChange("organisationName")}
              placeholder="Whānau or Organisation Name here"
              required={true}
              type="text"
            />
          </div>
          <div className="col-span-2">
            <FormComponent
              id="OrganisationDetails"
              label="Details of Whānau or Organisation"
              name="organisationDetails"
              value={formData.organisationDetails}
              onChange={handleChange("organisationDetails")}
              placeholder="Details of Whānau or Organisation here"
              required={false}
              type="textarea"
            />
          </div>
          <div>
            <FormComponent
              id="Phone"
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange("phone")}
              placeholder="Phone number here"
              required={true}
              type="text"
            />
          </div>
          <div>
            <FormComponent
              id="Email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="Email here"
              required={true}
              type="email"
            />
          </div>
          <div>
            <FormComponent
              id="Powhiri"
              label="Will a pōwhiri be required?"
              name="powhiri"
              value={formData.powhiri}
              onChange={handleChange("powhiri")}
              placeholder="Please Select"
              required={false}
              type="select"
              options={[
                { label: "Yes, we have waewae tapu", value: "yes" },
                {
                  label: "No, we have all been welcome to the Marae Before",
                  value: "no",
                },
                { label: "Unsure, need clarification", value: "unsure" },
              ]}
            />
          </div>

          <h1 className="font-roboto-regular text-xl col-span-2">
            Details of Person Responsible During Occupation
          </h1>

          <div>
            <FormComponent
              id="ResponsibleFirstName"
              label="First Name"
              name="responsibleFirstName"
              value={formData.responsibleFirstName}
              onChange={handleChange("responsibleFirstName")}
              placeholder="First Name Here"
              required={false}
              type="text"
            />
          </div>
          <div>
            <FormComponent
              id="ResponsibleLastName"
              label="Last Name"
              name="responsibleLastName"
              value={formData.responsibleLastName}
              onChange={handleChange("responsibleLastName")}
              placeholder="Last Name Here"
              required={false}
              type="text"
            />
          </div>
          <div>
            <FormComponent
              id="ResponsiblePhone"
              label="Phone"
              name="responsiblePhone"
              value={formData.responsiblePhone}
              onChange={handleChange("responsiblePhone")}
              placeholder="Phone number here"
              required={false}
              type="text"
            />
          </div>
          <div>
            <FormComponent
              id="ResponsibleEmail"
              label="Email"
              name="responsibleEmail"
              value={formData.responsibleEmail}
              onChange={handleChange("responsibleEmail")}
              placeholder="Email here"
              required={false}
              type="email"
            />
          </div>
          <div className="col-span-2">
            <FormComponent
              id="Purpose"
              label="Purpose of Booking"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange("purpose")}
              placeholder="Purpose of Booking here"
              required={true}
              type="textarea"
            />
          </div>
          <div>
            <FormComponent
              id="BookingFrom"
              label="Booking Date From"
              name="bookingFrom"
              value={formData.bookingFrom}
              onChange={handleChange("bookingFrom")}
              placeholder="Booking Date From here"
              required={false}
              type="date"
            />
          </div>
          <div>
            <FormComponent
              id="BookingTo"
              label="Booking Date To"
              name="bookingTo"
              value={formData.bookingTo}
              onChange={handleChange("bookingTo")}
              placeholder="Booking Date To here"
              required={false}
              type="date"
            />
          </div>

          <h1 className="font-roboto-regular text-xl col-span-2">Wharenui</h1>

          <div>
            <FormComponent
              id="WharenuiFirstName"
              label="First Name"
              name="wharenuiFirstName"
              value={formData.wharenuiFirstName}
              onChange={handleChange("wharenuiFirstName")}
              placeholder="First Name Here"
              required={true}
              type="text"
            />
          </div>
          <div>
            <FormComponent
              id="WharenuiLastName"
              label="Last Name"
              name="wharenuiLastName"
              value={formData.wharenuiLastName}
              onChange={handleChange("wharenuiLastName")}
              placeholder="Last Name Here"
              required={true}
              type="text"
            />
          </div>

          <h1 className="font-roboto-regular text-xl col-span-2">Warekai</h1>

          <div>
            <FormComponent
              id="WharekaiFirstName"
              label="First Name"
              name="wharekaiFirstName"
              value={formData.wharekaiFirstName}
              onChange={handleChange("wharekaiFirstName")}
              placeholder="First Name Here"
              required={false}
              type="text"
            />
          </div>
          <div>
            <FormComponent
              id="WharekaiLastName"
              label="Last Name"
              name="wharekaiLastName"
              value={formData.wharekaiLastName}
              onChange={handleChange("wharekaiLastName")}
              placeholder="Last Name Here"
              required={false}
              type="text"
            />
          </div>

          <h1 className="font-roboto-regular text-xl col-span-2">
            Ablution block & other Areas
          </h1>

          <div>
            <FormComponent
              id="AblutionFirstName"
              label="First Name"
              name="ablutionFirstName"
              value={formData.ablutionFirstName}
              onChange={handleChange("ablutionFirstName")}
              placeholder="First Name Here"
              required={false}
              type="text"
            />
          </div>
          <div>
            <FormComponent
              id="AblutionLastName"
              label="Last Name"
              name="ablutionLastName"
              value={formData.ablutionLastName}
              onChange={handleChange("ablutionLastName")}
              placeholder="Last Name Here"
              required={false}
              type="text"
            />
          </div>

          <h1 className="font-roboto-regular text-xl col-span-2">
            Marae Tikanga
          </h1>
          <p className="font-roboto-regular  col-span-2">
            Our marae have strict tikanga in place, and any disregard for them
            may result in the decline of future hire requests.
          </p>
          <span className="w-full col-span-2 h-0.5 bg-gray-100"></span>

          <p className="font-roboto-regular col-span-2">
            Please tick each box as an acknowledgement that you have read and
            understood each one
          </p>

          <div>
            <FormComponent
              id="acknowledgesNoAlcohol"
              label="Matai Whetu is a NO ALCOHOL & NO DRUGS MARAE"
              name="acknowledgesNoAlcohol"
              value={formData.acknowledgesNoAlcohol}
              onChange={handleChange("acknowledgesNoAlcohol")}
              required={true}
              type="checkbox"
            />
          </div>

          <div>
            <FormComponent
              id="acknowledgesNoPhotos"
              label="There are to be no photos or videos taken inside Te Rama O Hauraki (Wharenui)"
              name="acknowledgesNoPhotos"
              value={formData.acknowledgesNoPhotos}
              onChange={handleChange("acknowledgesNoPhotos")}
              required={true}
              type="checkbox"
            />
          </div>

          <div>
            <FormComponent
              id="acknowledgesNoFood"
              label="No food or drink is to be consumed inside Te Rama O Hauraki (Wharenui) however water is permitted."
              name="acknowledgesNoFood"
              value={formData.acknowledgesNoFood}
              onChange={handleChange("acknowledgesNoFood")}
              required={true}
              type="checkbox"
            />
          </div>

          <div>
            <FormComponent
              id="acknowledgesSmokingArea"
              label="Smoking/Vaping is to be in the designated area behind Waiora (Wharekai) or outside the perimeter of the Marae, no where else."
              name="acknowledgesSmokingArea"
              value={formData.acknowledgesSmokingArea}
              onChange={handleChange("acknowledgesSmokingArea")}
              required={true}
              type="checkbox"
            />
          </div>
          <div className="w-full flex-col items-center col-span-2 gap-10">
            <button
              onClick={() => {
                window.open("/path-to-your-file.pdf", "_blank");
                setReadFile(true); // ✅ This enables the checkbox
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Open File
            </button>

            <div className="mt-10">
              <FormComponent
                id="readTikangaInfoSheet"
                label="I have read the tikanga and marae information sheet, and agree that my digital signature will be acknowledged as my acceptance."
                name="readTikangaInfoSheet"
                value={formData.readTikangaInfoSheet}
                onChange={handleChange("readTikangaInfoSheet")}
                required={true}
                disabled={!readFile} // ✅ Disable until file is opened
                type="checkbox"
              />
            </div>
          </div>
        </form>

        {/* RIGHT: Preview */}
        <div className="sticky top-20 overflow-y-auto bg-white p-8 rounded shadow full">
          <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>

          {/* Helper function to render fields with missing validation */}
          {[
            {
              label: "Name",
              value: `${formData.firstName} ${formData.lastName}`.trim(),
              keys: ["firstName", "lastName"],
            },
            {
              label: "Whānau/Organisation Name",
              value: formData.organisationName,
              keys: ["organisationName"],
            },
            {
              label: "Details",
              value: formData.organisationDetails,
              keys: ["organisationDetails"],
            },
            { label: "Phone", value: formData.phone, keys: ["phone"] },
            { label: "Email", value: formData.email, keys: ["email"] },
            {
              label: "Will a pōwhiri be required?",
              value: formData.powhiri,
              keys: ["powhiri"],
            },
          ].map(({ label, value, keys }) => (
            <div key={label} className="mb-3">
              <p>
                <strong>{label}:</strong>{" "}
                {value || <span className="text-gray-400">Not provided</span>}
              </p>
              {isMissing(keys) && (
                <p className="text-sm text-red-600">
                  Missing {label.toLowerCase()}.
                </p>
              )}
            </div>
          ))}

          <hr className="my-4" />

          <h3 className="font-semibold">
            Person Responsible During Occupation
          </h3>
          {[
            {
              label: "Name",
              value:
                `${formData.responsibleFirstName} ${formData.responsibleLastName}`.trim(),
              keys: ["responsibleFirstName", "responsibleLastName"],
            },
            {
              label: "Phone",
              value: formData.responsiblePhone,
              keys: ["responsiblePhone"],
            },
            {
              label: "Email",
              value: formData.responsibleEmail,
              keys: ["responsibleEmail"],
            },
          ].map(({ label, value, keys }) => (
            <div key={label} className="mb-3">
              <p>
                <strong>{label}:</strong>{" "}
                {value || <span className="text-gray-400">Not provided</span>}
              </p>
              {isMissing(keys) && (
                <p className="text-sm text-red-600">
                  Missing {label.toLowerCase()}.
                </p>
              )}
            </div>
          ))}

          <hr className="my-4" />

          {[
            {
              label: "Purpose of Booking",
              value: formData.purpose,
              key: "purpose",
            },
            {
              label: "Booking From",
              value: formData.bookingFrom,
              key: "bookingFrom",
            },
            {
              label: "Booking To",
              value: formData.bookingTo,
              key: "bookingTo",
            },
          ].map(({ label, value, key }) => (
            <div key={label} className="mb-3">
              <p>
                <strong>{label}:</strong>{" "}
                {value || <span className="text-gray-400">Not provided</span>}
              </p>
              {isMissing([key]) && (
                <p className="text-sm text-red-600">
                  Missing {label.toLowerCase()}.
                </p>
              )}
            </div>
          ))}

          <hr className="my-4" />

          <h3 className="font-semibold">Wharenui</h3>
          <p>
            <strong>Name:</strong> {formData.wharenuiFirstName}{" "}
            {formData.wharenuiLastName}
          </p>

          <h3 className="font-semibold">Wharekai</h3>
          <p>
            <strong>Name:</strong> {formData.wharekaiFirstName}{" "}
            {formData.wharekaiLastName}
          </p>

          <h3 className="font-semibold">Ablution block & other Areas</h3>
          <p>
            <strong>Name:</strong> {formData.ablutionFirstName}{" "}
            {formData.ablutionLastName}
          </p>

          <hr className="my-4" />

          <p className="text-sm italic text-gray-500">
            Our marae have strict tikanga in place, and any disregard for them
            may result in the decline of future hire requests.
          </p>

          <hr className="my-4" />

          <h3 className="font-semibold">Acknowledgements</h3>
          <ul className="list-disc ml-6 text-sm">
            {formData.acknowledgesNoAlcohol && (
              <li>No Alcohol & No Drugs acknowledged</li>
            )}
            {formData.acknowledgesNoPhotos && (
              <li>No Photos/Videos acknowledged</li>
            )}
            {formData.acknowledgesNoFood && (
              <li>No Food or Drink acknowledged</li>
            )}
            {formData.acknowledgesSmokingArea && (
              <li>Smoking/Vaping Policy acknowledged</li>
            )}
          </ul>
          {(!formData.acknowledgesNoAlcohol ||
            !formData.acknowledgesNoPhotos ||
            !formData.acknowledgesNoFood ||
            !formData.acknowledgesSmokingArea) &&
            (formSubmitted || Object.values(formTouched).some((t) => t)) && (
              <p className="text-sm text-red-600 mt-2">
                Please tick all acknowledgements.
              </p>
            )}
          {formData.acknowledgesNoAlcohol &&
            formData.acknowledgesNoPhotos &&
            formData.acknowledgesNoFood &&
            formData.acknowledgesSmokingArea && (
              <p className="text-sm text-green-600 mt-2">
                All acknowledgements complete ✅
              </p>
            )}

          <div className="w-full flex justify-center ">
            <button
              type="button"
              onClick={validateBeforeSubmit}
              className="mt-6 px-20 py-5 bg-gray-500 text-white hover:bg-gray-700 duration-200 ease-in-out"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      {showConfirm && (
        <div
          className={`
    fixed inset-0 flex items-center justify-center z-50
    backdrop-blur transition-all duration-300 ease-in-out backdrop-brightness-50
   
  `}
        >
          <div
            className={`
      bg-white p-6 rounded shadow-lg w-[90%] max-w-md text-center
      transform transition-all duration-300 ease-in-out
      ${showConfirm ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
    `}
          >
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">
              This will send your booking request via email.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 ease-in-out duration-200 "
              >
                Send Booking
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-400  ease-in-out duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MataiWhetu;
