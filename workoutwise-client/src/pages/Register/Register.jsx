import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormField from "../../components/FormField/FormField";
import "./Register.scss";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    password: "",
    cfrmPassword: "",
  });

  const [errorField, setErrorField] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errorField[name])
      setErrorField((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleNavigateToLogin = () => {
    navigate("/");
  };
  const handleValidation = () => {
    const errorFields = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (registerData.firstName === "") {
      errorFields.firstName = "Please enter your First Name";
    }
    if (registerData.lastName === "") {
      errorFields.lastName = "Please enter your Last Name";
    }
    if (registerData.email === "") {
      errorFields.email = "Please enter your Email";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        registerData.email
      )
    ) {
      errorFields.email = "Please enter the valid Email";
    }
    if (registerData.password === "") {
      errorFields.password = "Please Enter the Valid Password";
    } else if (!passwordRegex.test(registerData.password)) {
      errorFields.password =
        "Password must be at least 8 characters long, include one uppercase, one lowercase, one number, and one special character.";
    }
    if (registerData.cfrmPassword === "") {
      errorFields.cfrmPassword = "please re enter the Password";
    }
    if (registerData.password !== registerData.cfrmPassword) {
      errorFields.cfrmPassword =
        "The confirmation password must match the password above.";
    }
    setErrorField(errorFields);
    return Object.keys(errorFields).length === 0;
  };

  const createUser = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/register`, data);
      toast.success("You are Registered Successfully. Please Login");
      handleNavigateToLogin();
    } catch (error) {
      toast.error(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const data = {
        firstname: registerData.firstName,
        lastname: registerData.lastName,
        email: registerData.email,
        gender: registerData.gender,
        password: registerData.password,
      };
      createUser(data);
    }
  };
  return (
    <section className="wrapper">
      <section className="register__container">
        <div>
          <h1>Register Here</h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <FormField
            label="First Name"
            name="firstName"
            placeholder="Enter your First Name"
            inputValue={registerData.firstName}
            handleChange={handleChange}
            type="text"
            isError={errorField.firstName !== undefined}
            errorMessage={errorField.firstName}
          />
          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Enter your Last Name"
            inputValue={registerData.lastName}
            handleChange={handleChange}
            type="text"
            isError={errorField.lastName !== undefined}
            errorMessage={errorField.lastName}
          />
          <FormField
            label="Email"
            name="email"
            placeholder="Enter your Email"
            inputValue={registerData.email}
            handleChange={handleChange}
            type="text"
            isError={errorField.email !== undefined}
            errorMessage={errorField.email}
          />
          <div className="formfield">
            <h3 className="formfield__label">Gender</h3>
            <div className="formfield__radio-btn-container">
              <div className="formfield__each-radio-btn-container">
                <input
                  className="formfield__input"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={registerData.gender === "male"}
                  onChange={handleChange}
                />
                <p className="formfield__each-radio-btn-label">Male</p>
              </div>
              <div className="formfield__each-radio-btn-container">
                <input
                  className="formfield__input"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={registerData.gender === "female"}
                  onChange={handleChange}
                />
                <p className="formfield__each-radio-btn-label">Female</p>
              </div>
            </div>
          </div>
          <FormField
            label="Password"
            name="password"
            placeholder="Enter your Password"
            inputValue={registerData.password}
            handleChange={handleChange}
            type="password"
            isError={errorField.password !== undefined}
            errorMessage={errorField.password}
          />
          <FormField
            label="Confirm Password"
            name="cfrmPassword"
            placeholder="Confirm your Password"
            inputValue={registerData.cfrmPassword}
            handleChange={handleChange}
            type="password"
            isError={errorField.cfrmPassword !== undefined}
            errorMessage={errorField.cfrmPassword}
          />
          <Button type="submit" text="Submit" />
        </form>
      </section>
    </section>
  );
}

export default Register;
