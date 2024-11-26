import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import { v4 as uuidv4 } from "uuid";
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

export const getExcercisesByCategoryAndIntensity = async (req, res) => {
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
      return res.json(result);
    } else if (category) {
      const categories = fs.readFileSync(
        "./data/excercisesByCategories.json",
        "utf-8"
      );
      const parsedCategories = JSON.parse(categories);
      const result = parsedCategories.find(
        (item) => item.category === category
      );
      return res.json(result);
    } else if (intensity) {
      const excerciseData = await knex("exercises");
      const filterExcercisesByIntensity = excerciseData.filter((item) => {
        item.difficulty_level === intensity;
      });
      return res.json(filterExcercisesByIntensity);
    } else {
      const data = await knex("exercises");
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({
      message: "An error occured while retrieving the Excercises data",
    });
  }
};
// export const getExcerciseByCategory = async (req, res) => {
//   const { category } = req.params;
//   if (!category) {
//     res.status(400).json({ error: "Please provide Category" });
//   }
//   try {
//     const categories = fs.readFileSync(
//       "./data/excercisesByCategories.json",
//       "utf-8"
//     );
//     const parsedCategories = JSON.parse(categories);
//     const ExcercisesByCategory = parsedCategories.find(
//       (excercises) => excercises.category === category
//     );
//     res.json(ExcercisesByCategory);
//   } catch (err) {
//     res.status(500).json({
//       message: "An error occured while retrieving the Excercises by Category",
//     });
//   }
// };

// export const getAllExcercises = async (_req, res) => {
//   try {
//     const data = await knex("exercises");
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error retrieving Excercises:", error);
//     res.status(500).json({
//       message: "An error occurred while retrieving the Excercises.",
//     });
//   }
// };
