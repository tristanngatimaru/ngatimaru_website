// --------------------------
// src/components/formSections/PersonResponsible.jsx
// --------------------------

import FormComponent from "@/components/FormComponent";

const PersonResponsible = ({ formData, handleChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <h1 className="font-roboto-regular text-xl col-span-2">
      Details of Person Responsible During Occupation
    </h1>
    <FormComponent
      id="firstNameResponsible"
      label="First Name"
      name="firstNameResponsible"
      value={formData.firstNameResponsible}
      onChange={handleChange("firstNameResponsible")}
      placeholder="First Name Here"
      type="text"
    />
    <FormComponent
      id="lastNameResponsible"
      label="Last Name"
      name="lastNameResponsible"
      value={formData.lastNameResponsible}
      onChange={handleChange("lastNameResponsible")}
      placeholder="Last Name Here"
      type="text"
    />
    <FormComponent
      id="phoneResponsible"
      label="Phone"
      name="phoneResponsible"
      value={formData.phoneResponsible}
      onChange={handleChange("phoneResponsible")}
      placeholder="Phone number here"
      type="text"
    />
    <FormComponent
      id="emailResponsible"
      label="Email"
      name="emailResponsible"
      value={formData.emailResponsible}
      onChange={handleChange("emailResponsible")}
      placeholder="Email here"
      type="email"
    />
  </div>
);

export default PersonResponsible;
