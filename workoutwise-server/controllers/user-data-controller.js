import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const calculateBmi = (height, weight) => {
  let heightInMeters = 0;
  if (height > 3) {
    heightInMeters = height * 0.3048;
  }
  const bmi = parseFloat(
    (weight / (heightInMeters * heightInMeters)).toFixed(2)
  );
  let category = "";
  if (bmi < 18.5) {
    category = "Under Weight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal Weight";
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Over Weight";
  } else if (bmi >= 30) {
    category = "Obesity";
  }
  return { bmi, category };
};

const getUserDataByuserId = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "User Id is required" });
  }
  try {
    const result = await knex("user_data")
      .where({ user_id: userId })
      .orderBy("created_at", "desc")
      .first();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
const createUserData = async (req, res) => {
  const { user_id, height, weight, step_count, date, exercise_id, rep_count } =
    req.body;
  if (
    !user_id ||
    !height ||
    !weight ||
    !step_count ||
    !date ||
    !exercise_id ||
    !rep_count
  ) {
    return res
      .status(400)
      .json({ error: "All Required Fields must be filled" });
  }
  try {
    const data = {
      user_id,
      height: parseFloat(height.toFixed(2)),
      weight: parseFloat(weight.toFixed(2)),
      bmi: calculateBmi(height, weight).bmi,
      step_count,
      bmi_status: calculateBmi(height, weight).category,
      exercise_id: exercise_id,
      date: date,
      rep_count,
    };
    const result = await knex("user_data").insert({ ...data });
    const newUser = await knex("user_info").where({ id: result[0] }).first();
    // Send a success response
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};

const getAllUserDataByUserId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "User Id is required" });
  }
  try {
    const result = await knex("user_data")
      .leftJoin("exercises", "user_data.exercise_id", "exercises.id")
      .select(
        "user_data.id",
        "user_data.date",
        "user_data.rep_count",
        "exercises.exercise_name",
        "exercises.category",
        "exercises.body_region"
      )
      .where({ "user_data.user_id": id });
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const deleteUserDataById = async (req, res) => {
  const { id } = req.params;
  try {
    await knex("user_data").where({ id: id }).del();
    res.status(200).json({ message: "User Data is deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getUserDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await knex("user_data")
      .leftJoin("exercises", "user_data.exercise_id", "exercises.id")
      .select("user_data.*", "exercises.category", "exercises.exercise_name")
      .where({ "user_data.id": id })
      .first();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const updateUserDataById = async (req, res) => {
  const { id } = req.params;
  const { date, user_id, height, weight, step_count, exercise_id, rep_count } =
    req.body;
  if (
    !date ||
    !user_id ||
    !height ||
    !weight ||
    !step_count ||
    !exercise_id ||
    !rep_count
  ) {
    return res
      .status(400)
      .json({ error: "All Required Fields must be filled" });
  }
  try {
    await knex("user_data")
      .where({ id: id })
      .update({
        date,
        user_id,
        height,
        weight,
        step_count,
        exercise_id,
        rep_count,
        bmi: calculateBmi(height, weight).bmi,
        bmi_status: calculateBmi(height, weight).category,
      });
    const UpdatedData = await knex("user_data").where({ id: id }).first();
    res.status(200).json({ UpdatedData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getExercisePerformedCountByBodyRegion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await knex("user_data")
      .join("exercises", "user_data.exercise_id", "=", "exercises.id")
      .where("user_data.user_id", id)
      .groupBy("exercises.body_region")
      .select("exercises.body_region")
      .count("user_data.exercise_id as exercise_count");
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export {
  createUserData,
  getUserDataByuserId,
  getAllUserDataByUserId,
  deleteUserDataById,
  getUserDataById,
  updateUserDataById,
  getExercisePerformedCountByBodyRegion,
};
