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
  const { category, intensity } = req.query;
  try {
    if (category && intensity) {
      const categories = fs.readFileSync(
        "./data/excercisesByCategories.json",
        "utf-8"
      );
      const parsedCategories = JSON.parse(categories);
      const result = parsedCategories
        .find((item) => item.category === category)
        .excercises.filter((item) => item.difficulty_level === intensity);
      return res.json(result.slice(0, 10));
    } else if (category) {
      const categories = fs.readFileSync(
        "./data/excercisesByCategories.json",
        "utf-8"
      );
      const parsedCategories = JSON.parse(categories);
      const result = parsedCategories
        .find((item) => item.category === category)
        .excercises.slice(0, 20);
      return res.json(result);
    } else if (intensity) {
      const excerciseData = await knex("exercises");
      const filterExcercisesByIntensity = excerciseData
        .filter((item) => item.difficulty_level === intensity)
        .slice(0, 20);
      return res.json(filterExcercisesByIntensity);
    } else {
      const data = await knex("exercises").limit(20);
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({
      message: "An error occured while retrieving the Excercises data",
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
