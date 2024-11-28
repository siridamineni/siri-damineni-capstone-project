import initKnex from "knex";
import configuration from "../knexfile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const knex = initKnex(configuration);

const { JWT_SECRET_KEY } = process.env;
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
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await knex("user_info")
      .where({ email: email.toLowerCase() })
      .first();
    if (!user) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const base64EncodedSecret =
        Buffer.from(JWT_SECRET_KEY).toString("base64");
      const token = jwt.sign(
        {
          userId: user.id,
          userName: user.firstname,
        },
        base64EncodedSecret,
        { expiresIn: "10h" }
      );
      res.json({
        token,
        user_info: {
          userId: user.id,
          name: `${user.firstname} ${user.lastname}`,
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export { createUser, authenticate };
