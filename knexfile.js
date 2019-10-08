module.exports = {
  client: 'mysql',
  connection: process.env.DATABASE_URL || { host: 'localhost', user: 'root', pass: 'root', database: 'rpg' },
  migrations: {
    directory: './db/migrations/'
  }
};