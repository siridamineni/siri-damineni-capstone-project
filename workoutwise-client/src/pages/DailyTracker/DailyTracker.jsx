import { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../../components/SideNav/SideNav";
import { useNavigate } from "react-router-dom";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import "./DailyTracker.scss";
import { USER_ID } from "../../shared/constants";
import { toast } from "react-toastify";

function DailyTracker() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [dailyTrackerData, setDailyTrackerData] = useState({
    height: 0,
    weight: 0,
    stepCount: 0,
  });

  const userId = localStorage.getItem(USER_ID);
  const [errorField, setErrorField] = useState({});
  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDailyTrackerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errorField[name])
      setErrorField((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleDataValidation = () => {
    let error = {};
    if (dailyTrackerData.height === 0) {
      error.height = "Please provide your Height";
    } else if (
      parseFloat(dailyTrackerData.height) < 2 ||
      parseFloat(dailyTrackerData.height) > 7
    ) {
      error.height = "Please provide valid Height";
    }
    if (dailyTrackerData.weight === 0) {
      error.weight = "Please provide your weight";
    }
    if (dailyTrackerData.stepCount === 0) {
      error.stepCount = "please provide your step count for today";
    }
    setErrorField(error);
    return Object.keys(error).length === 0;
  };

  const postDailyTrackerInformation = async (reqData) => {
    try {
      const data = await axios.post(`${baseUrl}/user-data`, reqData);
      toast.success("Updated the Daily tracker Information");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleDataValidation()) {
      const data = {
        user_id: userId,
        height: parseFloat(dailyTrackerData.height),
        weight: parseFloat(dailyTrackerData.weight),
        step_count: parseInt(dailyTrackerData.stepCount),
      };
      postDailyTrackerInformation(data);
    }
    handleNavigateToDashboard();
  };

  return (
    <main className="main-wrapper">
      <SideNav />
      <section className="wrapper">
        <div className="form__container">
          <form className="form" onSubmit={handleSubmit}>
            <FormField
              label="Height"
              name="height"
              placeholder="Enter your Height in Feet"
              inputValue={dailyTrackerData.height}
              handleChange={handleChange}
              type="number"
              isError={errorField?.height !== undefined}
              errorMessage={errorField.height}
            />
            <FormField
              label="Weight"
              name="weight"
              placeholder="Enter your Weight in lbs or Kgs"
              inputValue={dailyTrackerData.weight}
              handleChange={handleChange}
              type="number"
              isError={errorField?.weight !== undefined}
              errorMessage={errorField.weight}
            />
            <FormField
              label="Today's Step Count"
              name="stepCount"
              placeholder="Enter today's Step Count"
              inputValue={dailyTrackerData.stepCount}
              handleChange={handleChange}
              type="number"
              isError={errorField?.stepCount !== undefined}
              errorMessage={errorField.stepCount}
            />
            <Button type="submit" text="Submit" />
          </form>
        </div>
      </section>
    </main>
  );
}

export default DailyTracker;
