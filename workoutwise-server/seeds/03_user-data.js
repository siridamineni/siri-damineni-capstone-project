export async function seed(knex) {
  await knex("user_data").del();
  await knex("user_data").insert([
    {
      id: 1,
      user_id: 1,
      height: 7.5,
      weight: 60.8,
      bmi: 23,
      step_count: 5000,
    },
    {
      id: 2,
      user_id: 2,
      height: 5.6,
      weight: 89.45,
      bmi: 22,
      step_count: 8000,
    },
  ]);
}
