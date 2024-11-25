import initKnex from "knex";
import configuration from "../knexfile.js";
import bcrypt from "bcrypt";
const knex = initKnex(configuration);

const createUser = async (req, res) => {
  const { firstname, lastname, email, gender, password } = req.body;
  if (!firstname || !lastname || !email || !gender || !password) {
    return res
      .status(400)
      .json({ error: "All required fields must be filled" });
  }
  try {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const result = await knex("user_info").insert({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      dob: "1990-01-02",
      gender,
    });
    const newUser = await knex("user_info").where({ id: result[0] }).first();
    // Send a success response
    res.status(201).json(newUser);
  } catch (error) {
    // Handle potential errors
    if (error.code === "ER_DUP_ENTRY") {
      // MySQL-specific duplicate entry error
      return res.status(400).json({ error: "Email already exists" });
    }
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export { createUser };
