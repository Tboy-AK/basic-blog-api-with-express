
exports.up = function (knex) {
  return knex.schema.withSchema('public')
    .createTable('auths', (table) => {
      table.increments('_id');
      table.string('email', 100).notNullable().unique('auths_email_key');
      table.string('password', 1024).notNullable();
      table.string('first_name', 30).notNullable();
      table.string('last_name', 30).notNullable();
      table.string('phone', 20).notNullable();
      table.enum('user_type', ['admin', 'user']).notNullable();
      table.timestamps(true, true);
      table.integer('_v').defaultTo(1).notNullable();
    })
    .createTable('blogs', (table) => {
      table.increments('_id');
      table.string('content', 100).notNullable();
      table.integer('auth_id').unsigned().notNullable();
      table
        .foreign('auth_id', 'blogs_auth_id_fkey')
        .references('auths._id')
        .onUpdate(`
          CASCADE
        `)
        .onDelete(`
          CASCADE
        `);
      table.timestamps(true, true);
      table.integer('_v').defaultTo(1).notNullable();
    })
    .raw(`
      CREATE OR REPLACE FUNCTION on_version_modify()
        RETURNS TRIGGER
        LANGUAGE 'plpgsql'
        COST 100
        VOLATILE NOT LEAKPROOF
      AS $BODY$ BEGIN
        NEW._v := NEW._v + 1;
        RETURN NEW;
      END; $BODY$;
    `)
    .raw(`
      CREATE TRIGGER auths_on_version_modify
      BEFORE INSERT OR UPDATE
      ON PUBLIC.auths
      FOR EACH ROW
      EXECUTE PROCEDURE PUBLIC.on_version_modify();
    `)
    .raw(`
      CREATE TRIGGER blogs_on_version_modify
      BEFORE INSERT OR UPDATE
      ON PUBLIC.blogs
      FOR EACH ROW
      EXECUTE PROCEDURE PUBLIC.on_version_modify();
    `);
};

exports.down = function (knex) {
  return knex.schema
    .raw(`
      DROP TABLE IF EXISTS auths CASCADE;
    `)
    .raw(`
      DROP TABLE IF EXISTS blogs CASCADE;
    `)
    .raw(`
      DROP FUNCTION IF EXISTS row_version_on_modify() CASCADE;
    `);
};

exports.config = { transaction: false };
