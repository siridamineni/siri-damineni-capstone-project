import "./FormField.scss";
import errorIcon from "../../assets/icons/error.svg";
function FormField({
  label,
  name,
  placeholder,
  inputValue,
  handleChange,
  type,
  isError,
  errorMessage,
}) {
  return (
    <div className="formfield">
      <label className="formfield__label">{label}</label>
      <input
        className={
          isError
            ? "formfield__input formfield__input--error"
            : "formfield__input"
        }
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        type={type}
      />
      {isError && (
        <span className="formfield__error-block">
          <img src={errorIcon} alt="error" className="formfield__error-img" />
          <p className="formfield__error">{errorMessage}</p>
        </span>
      )}
    </div>
  );
}

export default FormField;
