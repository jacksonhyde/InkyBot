module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'password',
      database : 'game_states',
      port : '3306'
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
};