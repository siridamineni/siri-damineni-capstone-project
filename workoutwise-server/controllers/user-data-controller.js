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

const createUserData = async (req, res) => {
  const { user_id, height, weight, step_count } = req.body;
  if (!user_id || !height || !weight || !step_count) {
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
    };
    const result = await knex("user_data").insert({
      user_id: data.user_id,
      height: data.height,
      weight: data.weight,
      bmi: data.bmi,
      step_count: data.step_count,
      bmi_status: data.bmi_status,
    });
    const newUser = await knex("user_info").where({ id: result[0] }).first();
    // Send a success response
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};

export { createUserData };
