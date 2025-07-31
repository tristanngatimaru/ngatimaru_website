import { useEffect } from "react";
import FormComponent from "../FormComponent";

const Acknowledgements = ({
  formData,
  handleChange,
  touchedFields,
  isMissing,
}) => {
  useEffect(() => {
    const allChecked =
      formData.acknowledgesNoAlcohol &&
      formData.acknowledgesNoPhotos &&
      formData.acknowledgesNoFood &&
      formData.acknowledgesSmokingArea;

    if (formData.agreedToTerms !== allChecked) {
      handleChange("agreedToTerms")(allChecked); // ✅ only update when value actually changes
    }
  }, [
    formData.acknowledgesNoAlcohol,
    formData.acknowledgesNoPhotos,
    formData.acknowledgesNoFood,
    formData.acknowledgesSmokingArea,
    formData.agreedToTerms,
    handleChange,
  ]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <h1 className="font-roboto-regular text-xl col-span-2">Marae Tikanga</h1>
      <p className="font-roboto-regular col-span-2">
        Our marae have strict tikanga in place, and any disregard for them may
        result in the decline of future hire requests.
      </p>
      <span className="w-full col-span-2 h-0.5 bg-gray-100"></span>

      <p className="font-roboto-regular col-span-2">
        Please tick each box as an acknowledgement that you have read and
        understood each one
      </p>

      <div>
        <FormComponent
          id="acknowledgesNoAlcohol"
          label="Matai Whetu is a NO ALCOHOL & NO DRUGS MARAE"
          name="acknowledgesNoAlcohol"
          value={formData.acknowledgesNoAlcohol}
          onChange={handleChange("acknowledgesNoAlcohol")}
          required={true}
          type="checkbox"
          touched={touchedFields.acknowledgesNoAlcohol}
          error={
            isMissing("acknowledgesNoAlcohol") &&
            touchedFields.acknowledgesNoAlcohol
          }
        />
      </div>

      <div>
        <FormComponent
          id="acknowledgesNoPhotos"
          label="There are to be no photos or videos taken inside Te Rama O Hauraki (Wharenui)"
          name="acknowledgesNoPhotos"
          value={formData.acknowledgesNoPhotos}
          onChange={handleChange("acknowledgesNoPhotos")}
          required={true}
          type="checkbox"
          touched={touchedFields.acknowledgesNoPhotos}
          error={
            isMissing("acknowledgesNoPhotos") &&
            touchedFields.acknowledgesNoPhotos
          }
        />
      </div>

      <div>
        <FormComponent
          id="acknowledgesNoFood"
          label="No food or drink is to be consumed inside Te Rama O Hauraki (Wharenui) however water is permitted."
          name="acknowledgesNoFood"
          value={formData.acknowledgesNoFood}
          onChange={handleChange("acknowledgesNoFood")}
          required={true}
          type="checkbox"
          touched={touchedFields.acknowledgesNoFood}
          error={
            isMissing("acknowledgesNoFood") && touchedFields.acknowledgesNoFood
          }
        />
      </div>

      <div>
        <FormComponent
          id="acknowledgesSmokingArea"
          label="Smoking/Vaping is to be in the designated area behind Waiora (Wharekai) or outside the perimeter of the Marae, no where else."
          name="acknowledgesSmokingArea"
          value={formData.acknowledgesSmokingArea}
          onChange={handleChange("acknowledgesSmokingArea")}
          required={true}
          type="checkbox"
          touched={touchedFields.acknowledgesSmokingArea}
          error={
            isMissing("acknowledgesSmokingArea") &&
            touchedFields.acknowledgesSmokingArea
          }
        />
      </div>
    </div>
  );
};

export default Acknowledgements;
