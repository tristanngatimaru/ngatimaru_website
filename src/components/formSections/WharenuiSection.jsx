import FormComponent from "@/components/FormComponent";

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
        id="firstNameWharenui"
        label="First Name Wharenui"
        name="firstNameWharenui"
        value={formData.firstNameWharenui}
        onChange={handleChange("firstNameWharenui")}
        placeholder="First Name Here"
        required
        type="text"
        touched={touchedFields.firstNameWharenui}
        error={
          isMissing("firstNameWharenui") && touchedFields.firstNameWharenui
        }
      />
    </div>

    <div className="col-span-1">
      <FormComponent
        id="lastNameWharenui"
        label="Last Name Wharenui"
        name="lastNameWharenui"
        value={formData.lastNameWharenui}
        onChange={handleChange("lastNameWharenui")}
        placeholder="Last Name Here"
        required
        type="text"
        touched={touchedFields.lastNameWharenui}
        error={isMissing("lastNameWharenui") && touchedFields.lastNameWharenui}
      />
    </div>
  </div>
);

export default WharenuiSection;
