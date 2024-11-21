export function up(knex) {
  return knex.schema.createTable("exercises", (table) => {
    table.increments("id").primary(); // Auto-incrementing primary key
    table.string("exercise_name").notNullable();
    table.string("video_url").notNullable();
    table.string("difficulty_level").notNullable();
    table.string("target_muscle_group").notNullable();
    table.string("prime_move_muscle").notNullable();
    table.string("secondary_muscle").defaultTo("");
    table.string("tertiary_muscle").defaultTo("");
    table.string("equipment").notNullable();
    table.string("posture").notNullable();
    table.string("single_double_arms").notNullable();
    table.string("continuous_alternating_arms").notNullable();
    table.string("grip").notNullable();
    table.string("foot_elevation").notNullable();
    table.string("body_region").notNullable();
    table.string("force_type").notNullable();
    table.string("mechanics").notNullable();
    table.string("laterality").notNullable();
    table.string("category").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("exercises");
}
