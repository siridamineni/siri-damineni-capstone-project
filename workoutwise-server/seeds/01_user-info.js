import bcrypt from "bcrypt";
const saltRounds = 10;
export async function seed(knex) {
  await knex("user_info").del();
  await knex("user_info").insert([
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      password: bcrypt.hashSync("John@123", saltRounds),
      dob: "1990-01-01",
      gender: "Male",
    },
    {
      id: 2,
      firstname: "Jane",
      lastname: "Smith",
      email: "jane.smith@example.com",
      password: bcrypt.hashSync("Jane@123", saltRounds),
      dob: "1992-05-10",
      gender: "Female",
    },
  ]);
}
