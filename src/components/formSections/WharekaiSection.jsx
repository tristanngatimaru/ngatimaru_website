// --------------------------
// src/components/formSections/WharekaiSection.jsx
// --------------------------

import FormComponent from "../FormComponent";

const WharekaiSection = ({ formData, handleChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <h1 className="font-roboto-regular text-xl col-span-2">Wharekai</h1>

    <div>
      <FormComponent
        id="firstNameWharekai"
        label="First Name"
        name="firstNameWharekai"
        value={formData.firstNameWharekai}
        onChange={handleChange("firstNameWharekai")}
        placeholder="First Name Here"
        type="text"
      />
    </div>
    <div>
      <FormComponent
        id="lastNameWharekai"
        label="Last Name"
        name="lastNameWharekai"
        value={formData.lastNameWharekai}
        onChange={handleChange("lastNameWharekai")}
        placeholder="Last Name Here"
        type="text"
      />
    </div>
  </div>
);

export default WharekaiSection;
