module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'root',
      database : 'game_states'
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
};