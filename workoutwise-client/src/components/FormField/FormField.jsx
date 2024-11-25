import "./FormField.scss";
function FormField({
  label,
  name,
  placeholder,
  inputValue,
  handleChange,
  type,
}) {
  return (
    <div className="formfield">
      <label className="formfield__label">{label}</label>
      <input
        className="formfield__input"
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        required
        type={type}
      />
    </div>
  );
}

export default FormField;
