import { useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import FormField from "../../components/FormField/FormField";
import "./DailyTracker.scss";
function DailyTracker() {
  const [dailyTrackerData, setDailyTrackerData] = useState({
    height: 0,
    weight: 0,
    stepCount: 0,
    excerciseRepeats: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDailyTrackerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // if (errorField[name])
    //   setErrorField((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main className="main-wrapper">
      <SideNav />
      <section className="wrapper">
        {/* <form className="form" onSubmit={handleSubmit}>
          <FormField
            label="Height"
            name="height"
            placeholder="Enter your Height"
            inputValue={dailyTrackerData.height}
            handleChange={handleChange}
            type="text"
            // isError={errorField.firstName !== undefined}
            // errorMessage={errorField.firstName}
          />
        </form> */}
      </section>
    </main>
  );
}

export default DailyTracker;
