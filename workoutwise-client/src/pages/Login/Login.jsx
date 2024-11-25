import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNavigateToRegister = () => {
    navigate(`/register`);
  };

  return (
    <section className="wrapper">
      <section className="login-container">
        <form className="form" onSubmit={handleSubmit}>
          <FormField
            label="email"
            name="email"
            placeholder="Enter the Email"
            inputValue={email}
            handleChange={handleEmailChange}
            type="email"
          />
          <FormField
            label="password"
            name="password"
            placeholder="Enter the Password"
            inputValue={password}
            handleChange={handlePasswordChange}
            type="password"
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
