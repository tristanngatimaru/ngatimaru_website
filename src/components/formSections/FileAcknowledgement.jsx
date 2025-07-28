// --------------------------
// src/components/formSections/FileAcknowledgement.jsx
// --------------------------
import { useState } from "react";
import FormComponent from "../FormComponent";

const FileAcknowledgement = ({
  formData,
  handleChange,
  touchedFields,
  isMissing,
}) => {
  const [readFile, setReadFile] = useState(false);

  const handleOpenFile = () => {
    window.open("/path-to-your-file.pdf", "_blank");
    setReadFile(true);
  };

  return (
    <div className="w-full flex-col items-center col-span-2 gap-10 space-y-6">
      <button
        onClick={handleOpenFile}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Open Tikanga & Info Sheet
      </button>

      <FormComponent
        id="readTikangaInfoSheet"
        label="I have read the tikanga and marae information sheet, and agree that my digital signature will be acknowledged as my acceptance."
        name="readTikangaInfoSheet"
        checked={formData.readTikangaInfoSheet}
        onChange={handleChange("readTikangaInfoSheet")}
        required={true}
        disabled={!readFile} // readFile state can be replaced with readTikangaInfoSheet if needed
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
