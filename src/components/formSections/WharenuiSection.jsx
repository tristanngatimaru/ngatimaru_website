// --------------------------
// src/components/formSections/WharenuiSection.jsx
// --------------------------

import FormComponent from "../FormComponent";

const WharenuiSection = ({
  formData,
  handleChange,
  touchedFields,
  isMissing,
}) => (
  <div className="grid grid-cols-2 gap-4">
    <h1 className="font-roboto-regular text-xl col-span-2">Wharenui</h1>
    <div className="col-span-1">
      <FormComponent
        id="WharenuiFirstName"
        label="First Name"
        name="wharenuiFirstName"
        value={formData.wharenuiFirstName}
        onChange={handleChange("wharenuiFirstName")}
        placeholder="First Name Here"
        required
        type="text"
        touched={touchedFields.firstName}
        error={
          isMissing("Wharenui First Name") && touchedFields.wharenuiFirstName
        }
      />
    </div>
    <div className="col-span-1">
      <FormComponent
        id="WharenuiLastName"
        label="Last Name"
        name="wharenuiLastName"
        value={formData.wharenuiLastName}
        onChange={handleChange("wharenuiLastName")}
        placeholder="Last Name Here"
        required
        type="text"
        touched={touchedFields.firstName}
        error={
          isMissing("Wharenui Last name") && touchedFields.wharenuiLastName
        }
      />
    </div>
  </div>
);

export default WharenuiSection;
