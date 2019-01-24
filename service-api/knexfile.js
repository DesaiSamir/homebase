module.exports = {
  client: 'mysql',
  connection: {
    host : process.env.DATABASE_HOST,
    user: 'homebase',
    password: 'Homebase',
    database: 'homebase',
  }
};
