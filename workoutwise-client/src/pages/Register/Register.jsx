import { useState } from "react";
import FormField from "../../components/FormField/FormField";
import "./Register.scss";
import Button from "../../components/Button/Button";
function Register() {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    password: "",
    cfrmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="wrapper">
      <section className="register__container">
        <h1>Register Here</h1>
        <form className="form" onSubmit={handleSubmit}>
          <FormField
            label="First Name"
            name="firstName"
            placeholder="Enter your First Name"
            inputValue={registerData.firstName}
            handleChange={handleChange}
            type="text"
          />
          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Enter your Last Name"
            inputValue={registerData.lastName}
            handleChange={handleChange}
            type="text"
          />
          <FormField
            label="Email"
            name="email"
            placeholder="Enter your Email"
            inputValue={registerData.email}
            handleChange={handleChange}
            type="text"
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
          />
          <FormField
            label="Confirm Password"
            name="cfrmPassword"
            placeholder="Confirm your Password"
            inputValue={registerData.cfrmPassword}
            handleChange={handleChange}
            type="password"
          />
          <Button type="submit" text="Submit" />
        </form>
      </section>
    </section>
  );
}

export default Register;
