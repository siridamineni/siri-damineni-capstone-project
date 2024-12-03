import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import fs from "fs";

const excercisesGroupedByCategories = async () => {
  try {
    const data = await knex("exercises");
    const groupExcercisesByCategory = data.reduce(
      (resultArray, eachExcercise) => {
        //checking whether the category already exists in resultArray
        let categoryGroup = resultArray.find(
          (categoryGroup) => categoryGroup.category === eachExcercise.category
        );
        //if not present initiating the new categorygroup and adding it to resultArray
        if (!categoryGroup) {
          categoryGroup = { category: eachExcercise.category, excercises: [] };
          resultArray.push(categoryGroup);
        }
        //adding excercises to the group
        categoryGroup.excercises.push({ ...eachExcercise });
        return resultArray;
      },
      []
    );
    const groupExcercisesByCategoryToJson = JSON.stringify(
      groupExcercisesByCategory,
      null,
      2
    );
    fs.writeFileSync(
      "data/excercisesByCategories.json",
      groupExcercisesByCategoryToJson,
      "utf-8"
    );
  } catch (err) {
    console.log(err);
  }
};
excercisesGroupedByCategories();

export const getAllExcercises = async (req, res) => {
  const { category, intensity, bodyRegion } = req.query;
  try {
    const resQuery = knex("exercises");
    if (category) {
      resQuery.where({ category });
    }
    if (intensity) {
      resQuery.where({ difficulty_level: intensity });
    }
    if (bodyRegion) {
      resQuery.where({ body_region: bodyRegion });
    }
    const result = await resQuery.select("*").limit(20);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "An error occured while retrieving the Excercises data",
    });
  }
};

export const getAllCategoryExercises = async (_req, res) => {
  try {
    const categories = fs.readFileSync(
      "./data/excercisesByCategories.json",
      "utf-8"
    );
    const parsedCategories = JSON.parse(categories);
    const RecordsOfExercisesForAllCategories = parsedCategories.map((item) => ({
      category: item.category,
      exercises: item.excercises.slice(0, 20),
    }));
    res.json(RecordsOfExercisesForAllCategories);
  } catch (err) {
    res.status(500).json({
      message: "An error occured while retrieving all category exercises",
    });
  }
};
export const getAllCategories = async (_req, res) => {
  try {
    const categories = fs.readFileSync(
      "./data/excercisesByCategories.json",
      "utf-8"
    );
    const parsedCategories = JSON.parse(categories);
    const allCategories = parsedCategories.map((item) => ({
      label: item.category,
      value: item.category,
    }));
    res.json(allCategories);
  } catch (err) {
    res.status(500).json({
      message: "An error occured while retrieving the Categories",
    });
  }
};

export const getAllIntensityLevels = async (_req, res) => {
  try {
    const data = await knex("exercises")
      .distinct("difficulty_level")
      .pluck("difficulty_level");
    const allIntensities = data.map((item) => ({ label: item, value: item }));
    res.json(allIntensities);
  } catch (err) {
    res.status(500).json({
      message: "An error occured while retrieving the Intensities",
    });
  }
};

export const getAllBodyRegion = async (_req, res) => {
  try {
    const data = await knex("exercises")
      .distinct("body_region")
      .whereNot("body_region", "like", "Unsorted*")
      .pluck("body_region");
    const allBodyRegions = data.map((item) => ({ label: item, value: item }));
    res.status(200).json(allBodyRegions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error while retrieving the Body Region" });
  }
};
export const getExcerciseById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await knex("exercises").where({ id }).first();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "An error occured while retrieving the excercise by Id",
    });
  }
};
