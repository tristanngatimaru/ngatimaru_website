// --------------------------
// src/components/formSections/OrganisationDetails.jsx
// --------------------------

import FormComponent from "../FormComponent";

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
        id="OrganisationDetails"
        label="Details of Whānau or Organisation"
        name="organisationDetails"
        value={formData.organisationDetails}
        onChange={handleChange("organisationDetails")}
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
          { label: "Yes, we have waewae tapu", value: "yes" },
          {
            label: "No, we have all been welcome to the Marae Before",
            value: "no",
          },
          { label: "Unsure, need clarification", value: "unsure" },
        ]}
      />
    </div>
  </div>
);

export default OrganisationDetails;
