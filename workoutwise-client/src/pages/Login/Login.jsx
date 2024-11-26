import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { TOKEN_NAME } from "../../shared/constants";

function Login() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorField, setErrorField] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errorField[name])
      setErrorField((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const Validatelogin = () => {
    const errorFields = {};
    const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    if (loginData.email === "") {
      errorFields.email = "Please provide your Email";
    } else if (!emailRegex.test(loginData.email)) {
      errorFields.email = "Please provide Valid Email";
    }
    if (loginData.password === "") {
      errorFields.password = "Please provide Valid Password";
    }
    setErrorField(errorFields);
    return Object.keys(errorFields).length === 0;
  };

  const LoginUser = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/authenticate`, data);
      const { token } = response.data;
      localStorage.setItem(TOKEN_NAME, token);
      navigate(`/dashboard`);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Validatelogin()) {
      const data = {
        email: loginData.email,
        password: loginData.password,
      };
      LoginUser(data);
    }
  };

  const handleNavigateToRegister = () => {
    navigate(`/register`);
  };

  return (
    <section className="login-wrapper">
      <section className="login__container">
        <h1>Login Here</h1>
        <form className="form" onSubmit={handleSubmit}>
          <FormField
            label="email"
            name="email"
            placeholder="Enter the Email"
            inputValue={loginData.email}
            handleChange={handleChange}
            type="email"
            isError={errorField.email !== undefined}
            errorMessage={errorField.email}
          />
          <FormField
            label="password"
            name="password"
            placeholder="Enter the Password"
            inputValue={loginData.password}
            handleChange={handleChange}
            type="password"
            isError={errorField.password !== undefined}
            errorMessage={errorField.password}
          />
          <Button type="submit" text="Submit" />
        </form>

        <div className="form-footer">
          <a href="/">Forgot Password?</a>
          <Button
            text="Register"
            type="button"
            handleClick={handleNavigateToRegister}
          />
        </div>
      </section>
    </section>
  );
}

export default Login;
