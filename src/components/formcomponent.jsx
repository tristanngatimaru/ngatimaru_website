import { useState } from "react";
// formcomponent.jsx
function FormComponent({
  type = "text",
  id,
  name,
  label,
  placeholder = "",
  required = false,
  options = [],
  value,
  onChange,
}) {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => setTouched(true);

  const showError =
    required &&
    touched &&
    ((type === "checkbox" && !value) ||
      (type !== "checkbox" && value?.toString().trim() === ""));

  const inputClass = `bg-gray-50 border ${
    showError ? "border-red-500" : "border-gray-300"
  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`;

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
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={handleBlur}
            required={required}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor={id} className="text-sm font-medium text-gray-900">
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
