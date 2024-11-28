export function up(knex) {
  return knex.schema.alterTable("user_data", (table) => {
    table.float("height").alter();
    table.float("weight").alter();
    table.float("bmi").alter();
    table.string("bmi_status").nullable();
  });
}

export function down(knex) {
  return knex.schema.alterTable("user_data", (table) => {
    table.integer("height").alter();
    table.integer("weight").alter();
    table.integer("bmi").alter();
    table.dropColumn("bmi_status");
  });
}
