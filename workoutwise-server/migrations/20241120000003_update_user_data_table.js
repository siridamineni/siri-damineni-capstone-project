export function up(knex) {
  return knex.schema.alterTable("user_data", (table) => {
    table.string("bmi_status").notNullable();
  });
}

export function down(knex) {
  return knex.schema.alterTable("user_data", (table) => {
    table.dropColumn("bmi_status");
  });
}
