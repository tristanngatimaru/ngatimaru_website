import { useState } from "react";

function FormComponent({
  type = "text",
  id,
  name,
  label,
  placeholder = "",
  required = false,
  options = [],
  value,
  checked,
  onChange,
  disabled = false,
}) {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => setTouched(true);

  // For checkbox, prefer 'checked' prop if defined, else fallback to 'value'
  const isChecked =
    type === "checkbox" ? (checked !== undefined ? checked : value) : undefined;

  const showError =
    required &&
    touched &&
    ((type === "checkbox" && !isChecked) ||
      (type !== "checkbox" && value?.toString().trim() === ""));

  const inputClass = `bg-gray-50 border ${
    showError ? "border-red-500" : "border-gray-300"
  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <div className="mb-5 w-full">
      {type !== "checkbox" && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          disabled={disabled}
          className={inputClass}
          rows={4}
        />
      ) : type === "select" ? (
        <select
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          disabled={disabled}
          className={inputClass}
        >
          <option value="">{placeholder || "Please select..."}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={isChecked}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
          <label
            htmlFor={id}
            className={`text-sm font-medium text-gray-900 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          disabled={disabled}
          className={inputClass}
        />
      )}

      {showError && (
        <p className="mt-1 text-sm text-red-600">This field is required.</p>
      )}
    </div>
  );
}

export default FormComponent;
