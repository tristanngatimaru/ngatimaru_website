// --------------------------
// src/components/formSections/WharekaiSection.jsx
// --------------------------

import FormComponent from "../FormComponent";

const WharekaiSection = ({ formData, handleChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <h1 className="font-roboto-regular text-xl col-span-2">Warekai</h1>

    <div>
      <FormComponent
        id="WharekaiFirstName"
        label="First Name"
        name="wharekaiFirstName"
        value={formData.wharekaiFirstName}
        onChange={handleChange("wharekaiFirstName")}
        placeholder="First Name Here"
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
        type="text"
      />
    </div>
  </div>
);

export default WharekaiSection;
