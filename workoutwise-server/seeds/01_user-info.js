export async function seed(knex) {
  await knex("user_info").del();
  await knex("user_info").insert([
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      password: "hashed_password_123",
      dob: "1990-01-01",
      gender: "Male",
    },
    {
      id: 2,
      firstname: "Jane",
      lastname: "Smith",
      email: "jane.smith@example.com",
      password: "hashed_password_456",
      dob: "1992-05-10",
      gender: "Female",
    },
  ]);
}
