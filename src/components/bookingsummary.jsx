// src/components/BookingSummary.jsx
const BookingSummary = ({ formData }) => {
  return (
    <div className="p-4  rounded bg-gray-50  max-h-[80vh]">
      <h2 className="text-lg font-bold mb-4">Booking Summary</h2>
      <ul className="space-y-4 text-sm">
        <li>
          <strong>Name:</strong>{" "}
          {`${formData.firstName} ${formData.lastName}`.trim() ||
            "Not provided"}
        </li>{" "}
        <li>
          <strong>Phone:</strong> {formData.phone || "Not provided"}
        </li>
        <li>
          <strong>Email:</strong> {formData.email || "Not provided"}
        </li>
        <li>
          <strong>Whānau/Organisation Name:</strong>{" "}
          {formData.organisationName || "Not provided"}
        </li>
        <li>
          <strong>Details:</strong>{" "}
          {formData.organisationDetails || "Not provided"}
        </li>
        <li>
          <strong>Will a pōwhiri be required?:</strong>{" "}
          {formData.powhiri || "Not provided"}
        </li>
        <hr />
        <li>
          <strong>Person Responsible During Occupation:</strong>
          <ul className="ml-4 mt-1 space-y-1 text-sm">
            <li>
              <strong>Name:</strong>{" "}
              {`${formData.responsibleFirstName} ${formData.responsibleLastName}`.trim() ||
                "Not provided"}
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              {formData.responsiblePhone || "Not provided"}
            </li>
            <li>
              <strong>Email:</strong>{" "}
              {formData.responsibleEmail || "Not provided"}
            </li>
          </ul>
        </li>
        <hr />
        <li>
          <strong>Purpose of Booking:</strong>{" "}
          {formData.purpose || "Not provided"}
        </li>
        <li>
          <strong>Booking From:</strong>{" "}
          {formData.bookingFrom || "Not provided"}
        </li>
        <li>
          <strong>Booking To:</strong> {formData.bookingTo || "Not provided"}
        </li>
        <hr />
        <li>
          <strong>Wharenui Contact:</strong>{" "}
          {`${formData.wharenuiFirstName} ${formData.wharenuiLastName}`.trim() ||
            "Not provided"}
        </li>
        <li>
          <strong>Wharekai Contact:</strong>{" "}
          {`${formData.wharekaiFirstName} ${formData.wharekaiLastName}`.trim() ||
            "Not provided"}
        </li>
        <li>
          <strong>Ablution block & other Areas Contact:</strong>{" "}
          {`${formData.ablutionFirstName} ${formData.ablutionLastName}`.trim() ||
            "Not provided"}
        </li>
        <hr />
        <li>
          <strong>Acknowledgements:</strong>
          <ul className="list-disc ml-6 mt-1 text-sm">
            {formData.acknowledgesNoAlcohol &&
            formData.acknowledgesNoPhotos &&
            formData.acknowledgesNoFood &&
            formData.acknowledgesSmokingArea ? (
              <li className="text-green-700">All acknowledgements provided</li>
            ) : (
              <>
                {formData.acknowledgesNoAlcohol && (
                  <li>No Alcohol & No Drugs acknowledged</li>
                )}
                {formData.acknowledgesNoPhotos && (
                  <li>No Photos/Videos acknowledged</li>
                )}
                {formData.acknowledgesNoFood && (
                  <li>No Food or Drink acknowledged</li>
                )}
                {formData.acknowledgesSmokingArea && (
                  <li>Smoking/Vaping Policy acknowledged</li>
                )}
                {!formData.acknowledgesNoAlcohol &&
                  !formData.acknowledgesNoPhotos &&
                  !formData.acknowledgesNoFood &&
                  !formData.acknowledgesSmokingArea && (
                    <li className="text-red-400">
                      No acknowledgements provided
                    </li>
                  )}
              </>
            )}
          </ul>
        </li>
        <li>
          <strong>Mātai Whetū Marae Information Sheet:</strong>
          <ul className="list-disc ml-6 mt-1 text-sm">
            {formData.readTikangaInfoSheet ? (
              <li className="text-green-700">Has been Read and Agreed</li>
            ) : (
              <>
                {!formData.readTikangaInfoSheet && (
                  <li className="text-red-400">Has not been Read or Agreed</li>
                )}
              </>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default BookingSummary;
