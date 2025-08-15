// --------------------------
// src/components/formSections/OrganisationDetails.jsx
// --------------------------

import FormComponent from "@/components/FormComponent";

const OrganisationDetails = ({
  formData,
  handleChange,
  touchedFields,
  isMissing,
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="col-span-2">
      <FormComponent
        id="OrganisationName"
        label="Whānau or Organisation Name"
        name="organisationName"
        value={formData.organisationName}
        onChange={handleChange("organisationName")}
        placeholder="Whānau or Organisation Name here"
        required
        type="text"
        touched={touchedFields.firstName}
        error={
          isMissing("Tikanga Info Sheet") && touchedFields.readTikangaInfoSheet
        }
      />
    </div>

    <div className="col-span-2">
      <FormComponent
        id="detailsOfWhanauOrOrganisation"
        label="Details of Whānau or Organisation"
        name="detailsOfWhanauOrOrganisation"
        value={formData.detailsOfWhanauOrOrganisation}
        onChange={handleChange("detailsOfWhanauOrOrganisation")}
        placeholder="Details of Whānau or Organisation here"
        type="textarea"
      />
    </div>

    <div className="col-span-1">
      <FormComponent
        id="Powhiri"
        label="Will a pōwhiri be required?"
        name="powhiri"
        value={formData.powhiri}
        onChange={handleChange("powhiri")}
        placeholder="Please Select"
        type="select"
        options={[
          {
            label: "Yes, we have waewae tapu",
            value: "Yes, we have waewae tapu",
          },
          {
            label: "No, we have all been welcome to the Marae Before",
            value: "No, we have all been welcome to the Marae Before",
          },
          {
            label: "Unsure, need clarification",
            value: "Unsure, need clarification",
          },
        ]}
      />
    </div>
  </div>
);

export default OrganisationDetails;
