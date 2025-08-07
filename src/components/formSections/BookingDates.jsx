// --------------------------
// src/components/formSections/BookingDates.jsx
// --------------------------

import FormComponent from "../FormComponent";

const BookingDates = ({ formData, handleChange, touchedFields, isMissing }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="col-span-2">
      <FormComponent
        id="bookingPurpose"
        label="bookingPurpose of Booking"
        name="bookingPurpose"
        value={formData.bookingPurpose}
        onChange={handleChange("bookingPurpose")}
        placeholder="bookingPurpose of Booking here"
        required={true}
        type="textarea"
        touched={touchedFields.firstName}
        error={isMissing("ablutionLastName") && touchedFields.ablutionLastName}
      />
    </div>
    <FormComponent
      id="DateFrom"
      label="Booking From"
      name="bookingFrom"
      value={formData.bookingFrom}
      onChange={handleChange("bookingFrom")}
      type="date"
      required
      touched={touchedFields.firstName}
      error={isMissing("ablutionLastName") && touchedFields.ablutionLastName}
    />
    <FormComponent
      id="DateTo"
      label="Booking To"
      name="bookingTo"
      value={formData.bookingTo}
      onChange={handleChange("bookingTo")}
      type="date"
      required
      touched={touchedFields.firstName}
      error={isMissing("ablutionLastName") && touchedFields.ablutionLastName}
    />
  </div>
);

export default BookingDates;
