export function up(knex) {
  return knex.schema.createTable("user_data", (table) => {
    table.increments("id").primary(); // Auto-incrementing primary key
    table.integer("user_id").unsigned().notNullable(); // Foreign key for user_info
    table.integer("height").notNullable(); // User's height
    table.integer("weight").notNullable(); // User's weight
    table.integer("bmi").notNullable(); // User's BMI
    table.integer("step_count").notNullable(); // User's step count
    table.integer("exercise_id").unsigned().nullable(); // Foreign key for exercises
    table.integer("rep_count").notNullable(); // Number of repetitions

    // Foreign Key Constraints
    table
      .foreign("user_id")
      .references("id")
      .inTable("user_info")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .foreign("exercise_id")
      .references("id")
      .inTable("exercises")
      .onUpdate("CASCADE")
      .onDelete("CASCADE"); // Assuming the 'exercises' table exists
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("user_data"); // Drop user_data table
}
