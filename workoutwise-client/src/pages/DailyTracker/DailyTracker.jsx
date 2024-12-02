import { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../../components/SideNav/SideNav";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import errorIcon from "../../assets/icons/error.svg";
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
    exerciseName: 0,
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
    const error = {};
    if (dailyTrackerData.date === undefined) {
      error.date = "Please Provide valid Date";
    }
    if (dailyTrackerData.category === undefined) {
      error.category = "Please Select the Category of Exercise";
    }
    if (dailyTrackerData.exerciseName === undefined) {
      error.exerciseName = "Please Select the Exercise Name";
    }
    if (dailyTrackerData.repeatCount === undefined) {
      error.repeatCount = "Please Enter the Repeat Count";
    } else if (dailyTrackerData.repeatCount < 0) {
      error.repeatCount = "Please Provide Valid Repeat Count";
    }
    if (dailyTrackerData.weight === undefined) {
      error.weight = "Please provide Weight";
    } else if (dailyTrackerData.weight <= 0) {
      error.weight = "Please provide Valid Weight";
    }
    if (dailyTrackerData.stepCount === undefined) {
      error.stepCount = "Please provide Step Count";
    } else if (dailyTrackerData.stepCount < 0) {
      error.stepCount = "Please provide Valid Step Count";
    }
    if (dailyTrackerData.height === undefined) {
      error.height = "Please provide your Height";
    } else if (
      parseFloat(dailyTrackerData.height) < 2 ||
      parseFloat(dailyTrackerData.height) > 7
    ) {
      error.height = "Please provide valid Height";
    }
    setErrorField(error);
    return Object.keys(error).length === 0;
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/categories`);
      setCategoryOptions(response.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getAllCategoryExercises = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/all-category-exercises`);
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
      const response = await axios.get(`${baseUrl}/api/user-details/${id}`);
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
      await axios.post(`${baseUrl}/api/user-data`, reqData);
      toast.success("Updated the Daily tracker Information");
      handleNavigateToDashboard();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const updateDailyTrackerInformation = async (reqData) => {
    try {
      await axios.put(`${baseUrl}/api/user-details/${id}`, reqData);
      toast.success("Modified the Daily tracker Information");
      handleNavigateToDashboard();
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
    if (handleDataValidation()) {
      if (id) {
        updateDailyTrackerInformation(data);
      } else {
        postDailyTrackerInformation(data);
      }
    }
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
                  value={dayjs(dailyTrackerData?.date) || dayjs(new Date())}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-input": {
                      fonSize: "0.8125rem",
                      color: "#000000",
                      padding: "0.5rem",
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      backgroundColor: "none", // Prevents background change
                    },
                    "&:hover:not(.Mui-focused)": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#87ceeb",
                      },
                    },
                    "& .MuiInputAdornment-root": {
                      paddingRight: "20px", // Add padding to the right of the icon
                    },
                  }}
                />
              </LocalizationProvider>
              {errorField.date && (
                <span className="field__error-block">
                  <img
                    src={errorIcon}
                    alt="error"
                    className="field__error-img"
                  />
                  <p className="field__error">{errorField.date}</p>
                </span>
              )}
            </div>
            <FormControl className="formfield__select">
              <label className="formfield__select-label">
                Exercise Category
              </label>
              <Select
                displayEmpty
                sx={{
                  backgroundColor: "#fafafa", // Background color
                  borderRadius: "4px", // Border radius
                  "& .MuiOutlinedInput-input": {
                    padding: "0.3rem",
                    fontSize: "0.8125rem",
                    fontFamily: " Avenir, sans-serif",
                    fontWeight: "normal",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e1e1e1", // Customize the border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#87ceeb", // Customize the border color on hover
                  },
                }}
                name="category"
                value={dailyTrackerData?.category || ""}
                onChange={(e) => handleChange(e)}>
                <MenuItem value="" disabled>
                  Select the category Option
                </MenuItem>
                {categoryOptions.map(({ label, value }, index) => {
                  return (
                    <MenuItem
                      style={{
                        fontSize: "0.8125rem",
                        fontFamily: " Avenir, sans-serif",
                        fontWeight: "bold",
                      }}
                      key={index}
                      value={value}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
              {errorField.category && (
                <span className="field__error-block">
                  <img
                    src={errorIcon}
                    alt="error"
                    className="field__error-img"
                  />
                  <p className="field__error">{errorField.category}</p>
                </span>
              )}
            </FormControl>
            {dailyTrackerData.category != undefined && (
              <FormControl className="formfield__select">
                <label className="formfield__select-label">Exercise Name</label>
                <Select
                  displayEmpty
                  sx={{
                    backgroundColor: "#fafafa", // Background color
                    borderRadius: "4px", // Border radius
                    "& .MuiOutlinedInput-input": {
                      padding: "0.3rem",
                      fontSize: "0.8125rem",
                      fontFamily: " Avenir, sans-serif",
                      fontWeight: "normal",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e1e1e1", // Customize the border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#87ceeb", // Customize the border color on hover
                    },
                  }}
                  name="exerciseName"
                  value={dailyTrackerData?.exerciseName || ""}
                  onChange={(e) => {
                    handleChange(e);
                  }}>
                  <MenuItem value="" disabled>
                    Select the exercise performed in the Options
                  </MenuItem>
                  {exerciseData
                    ?.find(
                      (item) => item.category === dailyTrackerData.category
                    )
                    ?.exerciseOptions?.map(({ label, value }, index) => {
                      return (
                        <MenuItem
                          style={{
                            fontSize: "0.8125rem",
                            fontFamily: " Avenir, sans-serif",
                            fontWeight: "bold",
                          }}
                          key={index}
                          value={value}>
                          {label}
                        </MenuItem>
                      );
                    })}
                </Select>
                {errorField.category && (
                  <span className="field__error-block">
                    <img
                      src={errorIcon}
                      alt="error"
                      className="field__error-img"
                    />
                    <p className="field__error">{errorField.exerciseName}</p>
                  </span>
                )}
              </FormControl>
            )}
            {dailyTrackerData.exerciseName !== undefined && (
              <FormField
                label="Exercise Repeat Count"
                name="repeatCount"
                placeholder={"Enter Exercise Repeation Count"}
                inputValue={dailyTrackerData.repeatCount || ""}
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
              inputValue={dailyTrackerData.height || 0}
              handleChange={handleChange}
              type="number"
              isError={errorField?.height !== undefined}
              errorMessage={errorField.height}
            />
            <FormField
              label="Weight"
              name="weight"
              placeholder="Enter your Weight in lbs or Kgs"
              inputValue={dailyTrackerData.weight || 0}
              handleChange={handleChange}
              type="number"
              isError={errorField?.weight !== undefined}
              errorMessage={errorField.weight}
            />
            <FormField
              label="Today's Step Count"
              name="stepCount"
              placeholder="Enter today's Step Count"
              inputValue={dailyTrackerData.stepCount || 0}
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
