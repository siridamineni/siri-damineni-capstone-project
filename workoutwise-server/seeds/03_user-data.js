export async function seed(knex) {
  await knex("user_data").del();
  await knex("user_data").insert([
    {
      id: 1,
      user_id: 1,
      height: 175,
      weight: 70,
      bmi: 23,
      step_count: 5000,
      exercise_id: "1",
      rep_count: 20,
    },
    {
      id: 2,
      user_id: 2,
      height: 165,
      weight: 60,
      bmi: 22,
      step_count: 8000,
      exercise_id: "2",
      rep_count: 30,
    },
  ]);
}
