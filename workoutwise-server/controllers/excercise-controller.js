import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import { v4 as uuidv4 } from "uuid";

export const getAllExcercises = async (_req, res) => {
  try {
    const data = await knex("exercises");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving Excercises:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the Excercises.",
    });
  }
};
