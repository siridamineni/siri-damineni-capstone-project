import { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../../components/SideNav/SideNav";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import "./DailyTracker.scss";
import { USER_ID } from "../../shared/constants";
import { toast } from "react-toastify";

function DailyTracker() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const params = useParams();
  const { id } = params;
  const [dailyTrackerData, setDailyTrackerData] = useState({
    date: dayjs(new Date()),
    height: 0,
    weight: 0,
    stepCount: 0,
    category: "",
    exerciseName: "",
    repeatCount: 0,
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [exerciseData, setExerciseData] = useState();
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

  const getCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/categories`);
      setCategoryOptions(response.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getAllCategoryExercises = async () => {
    try {
      const response = await axios.get(`${baseUrl}/all-category-exercises`);
      const exerciseDataOfAllCategories = response.data.map((item) => ({
        category: item.category,
        exerciseOptions: item.exercises.map((eachExercise) => ({
          label: eachExercise.exercise_name,
          value: eachExercise.id,
        })),
      }));
      setExerciseData(exerciseDataOfAllCategories);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getUserDataById = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/user-details/${id}`);
      const userData = {
        date: dayjs(response?.data?.date).format("YYYY-MM-DD"),
        height: response?.data?.height,
        weight: response.data?.weight,
        stepCount: response.data?.step_count,
        category: response.data?.category,
        exerciseName: response.data?.exercise_id,
        repeatCount: response.data?.rep_count,
      };
      setDailyTrackerData(userData);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const postDailyTrackerInformation = async (reqData) => {
    try {
      const data = await axios.post(`${baseUrl}/user-data`, reqData);
      toast.success("Created the Daily tracker Information");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const updateDailyTrackerInformation = async (reqData) => {
    try {
      const data = await axios.put(`${baseUrl}/user-details/${id}`, reqData);
      toast.success("Updated the Daily tracker Information");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      date: dayjs(dailyTrackerData.date).format("YYYY-MM-DD"),
      user_id: userId,
      height: parseFloat(dailyTrackerData.height),
      weight: parseFloat(dailyTrackerData.weight),
      step_count: parseInt(dailyTrackerData.stepCount),
      exercise_id: dailyTrackerData.exerciseName,
      rep_count: parseInt(dailyTrackerData.repeatCount),
    };
    if (id) {
      updateDailyTrackerInformation(data);
    } else {
      postDailyTrackerInformation(data);
    }
    handleNavigateToDashboard();
  };
  useEffect(() => {
    getCategories();
    getAllCategoryExercises();
  }, []);

  useEffect(() => {
    getUserDataById(id);
  }, [id]);
  return (
    <main className="main-wrapper">
      <SideNav />
      <section className="wrapper">
        <div className="form__container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="formfield__date">
              <label className="formfield__date-label">Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="date"
                  value={dayjs(dailyTrackerData.date)}
                  onChange={handleChange}
                />
              </LocalizationProvider>
            </div>
            <FormControl>
              <label className="formfield__date-label">Exercise Category</label>
              <Select
                name="category"
                value={dailyTrackerData.category}
                onChange={handleChange}>
                {categoryOptions.map(({ label, value }, index) => {
                  return (
                    <MenuItem key={index} value={value}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {dailyTrackerData.category !== "" && (
              <FormControl>
                <label className="formfield__date-label">Exercise Name</label>
                <Select
                  name="exerciseName"
                  value={dailyTrackerData.exerciseName}
                  onChange={handleChange}>
                  {exerciseData
                    ?.find(
                      (item) => item.category === dailyTrackerData.category
                    )
                    ?.exerciseOptions?.map(({ label, value }, index) => {
                      return (
                        <MenuItem key={index} value={value}>
                          {label}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            )}
            {dailyTrackerData.exerciseName !== "" && (
              <FormField
                label="Exercise Repeat Count"
                name="repeatCount"
                placeholder={"Enter Exercise Repeation Count"}
                inputValue={dailyTrackerData.repeatCount}
                handleChange={handleChange}
                type="number"
                isError={errorField?.repeatCount !== undefined}
                errorMessage={errorField.repeatCount}
              />
            )}
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
