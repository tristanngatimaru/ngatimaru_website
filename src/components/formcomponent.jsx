import { useState } from "react";

function FormComponent({
  type = "text",
  id,
  name,
  label,
  placeholder = "",
  required = false,
}) {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState("");

  const handleBlur = () => setTouched(true);
  const handleChange = (e) => setValue(e.target.value);

  const showError = required && touched && value.trim() === "";

  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`bg-gray-50 border ${
          showError ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
      />
      {showError && (
        <p className="mt-1 text-sm text-red-600">This field is required.</p>
      )}
    </div>
  );
}

export default FormComponent;
