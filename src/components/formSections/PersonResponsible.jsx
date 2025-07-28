// --------------------------
// src/components/formSections/PersonResponsible.jsx
// --------------------------

import FormComponent from "../FormComponent";

const PersonResponsible = ({ formData, handleChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <h1 className="font-roboto-regular text-xl col-span-2">
      Details of Person Responsible During Occupation
    </h1>
    <FormComponent
      id="ResponsibleFirstName"
      label="First Name"
      name="responsibleFirstName"
      value={formData.responsibleFirstName}
      onChange={handleChange("responsibleFirstName")}
      placeholder="First Name Here"
      type="text"
    />
    <FormComponent
      id="ResponsibleLastName"
      label="Last Name"
      name="responsibleLastName"
      value={formData.responsibleLastName}
      onChange={handleChange("responsibleLastName")}
      placeholder="Last Name Here"
      type="text"
    />
    <FormComponent
      id="ResponsiblePhone"
      label="Phone"
      name="responsiblePhone"
      value={formData.responsiblePhone}
      onChange={handleChange("responsiblePhone")}
      placeholder="Phone number here"
      type="text"
    />
    <FormComponent
      id="ResponsibleEmail"
      label="Email"
      name="responsibleEmail"
      value={formData.responsibleEmail}
      onChange={handleChange("responsibleEmail")}
      placeholder="Email here"
      type="email"
    />
  </div>
);

export default PersonResponsible;
