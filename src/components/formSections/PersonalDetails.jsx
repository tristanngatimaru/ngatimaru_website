// --------------------------
// src/components/formSections/PersonalDetails.jsx
// --------------------------

import FormComponent from "../FormComponent";

const PersonalDetails = ({
  formData,
  handleChange,
  touchedFields,
  isMissing,
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="col-span-1">
      <FormComponent
        id="FirstName"
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange("firstName")}
        placeholder="First Name Here"
        required
        type="text"
        touched={touchedFields.firstName}
        error={isMissing("First Name") && touchedFields.firstName}
      />
    </div>
    <div className="col-span-1">
      <FormComponent
        id="LastName"
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange("lastName")}
        placeholder="Last Name Here"
        required
        type="text"
        touched={touchedFields.firstName}
        error={isMissing("Last Name") && touchedFields.lastName}
      />
    </div>
    <div className="col-span-1">
      <FormComponent
        id="Phone"
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange("phone")}
        placeholder="Phone number here"
        required
        type="text"
        touched={touchedFields.firstName}
        error={isMissing("Phone Number") && touchedFields.phone}
      />
    </div>

    <div className="col-span-1">
      <FormComponent
        id="Email"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange("email")}
        placeholder="Email here"
        required
        type="email"
        touched={touchedFields.firstName}
        error={isMissing("Email") && touchedFields.email}
      />
    </div>
  </div>
);

export default PersonalDetails;
