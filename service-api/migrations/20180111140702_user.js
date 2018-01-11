exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function (t) {
        t.increments('userid').primary()
        t.string('username').notNullable()
        t.string('firstname').nullable()
        t.string('lastname').nullable()
        t.string('password').notNullable()
        t.timestamps(false, true)
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user')
};