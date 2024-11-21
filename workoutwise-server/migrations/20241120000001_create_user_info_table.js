export function up(knex) {
  return knex.schema.createTable("user_info", (table) => {
    table.increments("id").primary(); // Auto-incrementing primary key
    table.string("firstname").notNullable(); // User's first name
    table.string("lastname").notNullable(); // User's last name
    table.string("email").notNullable().unique(); // Email address (unique)
    table.string("password").notNullable(); // User's password
    table.date("dob").notNullable(); // User's date of birth
    table.string("gender").notNullable(); // User's gender
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("user_info"); // Drop user_info table
}
