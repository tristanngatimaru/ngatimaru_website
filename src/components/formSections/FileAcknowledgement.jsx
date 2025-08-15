// --------------------------
// src/components/formSections/FileAcknowledgement.jsx
// --------------------------
import { useState } from "react";
import FormComponent from "@/components/FormComponent";

const FileAcknowledgement = ({
  formData,
  handleChange,
  touchedFields,
  isMissing,
  tikangaUrl,
}) => {
  const [readFile, setReadFile] = useState(false);

  const handleOpenFile = () => {
    if (tikangaUrl) {
      // Construct the full URL for the Strapi file
      const fullUrl = tikangaUrl.startsWith("http")
        ? tikangaUrl
        : `http://localhost:1337${tikangaUrl}`;
      window.open(fullUrl, "_blank");
      setReadFile(true);
    } else {
      alert("Tikanga document is not available. Please contact support.");
    }
  };

  const handleMouseDown = (e) => {
    // Handle middle-click (mouse wheel button)
    if (e.button === 1) {
      e.preventDefault();
      handleOpenFile();
    }
  };

  return (
    <div className="w-full flex-col items-center col-span-2 gap-10 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleOpenFile}
          onMouseDown={handleMouseDown}
          className="px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors font-medium"
          disabled={!tikangaUrl}
        >
          {tikangaUrl ? "Open Tikanga & Info Sheet" : "Document Not Available"}
        </button>

        {readFile && (
          <p className="text-sm text-emerald-600 font-medium">
            ✓ Document opened - you can now acknowledge below
          </p>
        )}

        {!readFile && (
          <p className="text-sm text-gray-600">
            Please open and read the document before proceeding
          </p>
        )}
      </div>

      <FormComponent
        id="readTikangaInfoSheet"
        label="I have read the tikanga and marae information sheet, and agree that my digital signature will be acknowledged as my acceptance."
        name="readTikangaInfoSheet"
        checked={formData.readTikangaInfoSheet}
        onChange={handleChange("readTikangaInfoSheet")}
        required={true}
        disabled={!readFile}
        type="checkbox"
        touched={touchedFields.readTikangaInfoSheet}
        error={
          isMissing("readTikangaInfoSheet") &&
          touchedFields.readTikangaInfoSheet
        }
      />
    </div>
  );
};

export default FileAcknowledgement;
