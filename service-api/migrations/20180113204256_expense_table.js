
exports.up = function(knex, Promise) {
    return knex.schema.createTable('expense', function (t) {
        t.increments('expenseid').primary()
        t.timestamp('expense_date').nullable()
        t.string('title').nullable()
        t.string('categoryid').nullable()
        t.decimal('cost').nullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').nullable()
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('expense')
};
