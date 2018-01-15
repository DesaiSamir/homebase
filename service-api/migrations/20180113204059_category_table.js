
exports.up = function(knex, Promise) {
    return knex.schema.createTable('category', function (t) {
        t.increments('categoryid').primary()
        t.string('category').nullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').nullable()
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('category')
};