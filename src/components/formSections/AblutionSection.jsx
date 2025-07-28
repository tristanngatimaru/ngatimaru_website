import FormComponent from "../FormComponent";

const AblutionSection = ({
  formData,
  handleChange,
  isMissing,
  touchedFields,
}) => (
  <div className="grid grid-cols-2 gap-4">
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
        error={
          isMissing("ablutionFirstName") && touchedFields.ablutionFirstName
        }
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
        error={isMissing("ablutionLastName") && touchedFields.ablutionLastName}
      />
    </div>
  </div>
);

export default AblutionSection;
