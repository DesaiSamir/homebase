
exports.up = function(knex, Promise) {
    return knex.schema.createTable('expense', function (t) {
        t.increments('expenseid').primary()
        t.string('title').nullable()
        t.string('categoryid').nullable()
        t.string('cost').nullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').nullable()
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('expense')
};
