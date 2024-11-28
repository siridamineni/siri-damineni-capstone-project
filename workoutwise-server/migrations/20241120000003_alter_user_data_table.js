export function up(knex) {
  return knex.schema.alterTable("user_data", (table) => {
    table.dropForeign("exercise_id");
    table.dropColumn("exercise_id");
    table.dropColumn("rep_count");
  });
}

export function down(knex) {
  return knex.schema.alterTable("user_data", (table) => {
    table.integer("exercise_id").unsigned().nullable();
    table.integer("rep_count").nullable();
    table
      .foreign("exercise_id")
      .references("id")
      .inTable("exercises")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}
