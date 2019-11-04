# InkyBot

Play Ink games in Discord!

## Installation

1. Install node and mysql-server.
2. Fork/Clone the repo.
3. In terminal, navigate to the InkyBot directory and run command `npm install`.
4. Create a copy of `.sample-env` called `.env`.
5. In terminal, run command `mysql -u root -p` (it will prompt for your password). Once logged in, enter `CREATE DATABASE game_states;`.
6. Enter `CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';` where `username` and `password` are your choice, and should not be shared with anyone.
7. Enter ``GRANT ALL PRIVILEGES ON `game_states` . * TO 'username'@'localhost';`` where `username` is the user created in the last step. On success, enter `quit`.
8. Replicate the database username and password by typing each of them into `.env`, next to `DB_USERNAME` and `DB_PASSWORD` respectively.
9. Install knex (in terminal, run command `npm install knex -g`), then run `knex migrate:latest`.
10. On the Discord Developers site, create a new application, give it a name, and then click Bot in the left navbar. Click the "Create a Bot" button on the next page. Under Bot Secret, click "Copy." In `.env`, paste that string into the value for `BOT_TOKEN=`.
11. Back on the Discord Developers site, Select "Application" from the left sidebar. Copy the Application ID and navigate to `https://discordapp.com/oauth2/authorize?&client_id=YOURAPPIDHERE&scope=bot&permissions=0` after replacing the app id with the one you copied. Use the OAUTH workflow to add the bot to your server.
12. In terminal, run `npm run start` (or `node .`) to bring your bot online.

## Commands

* `!start` creates a new game save of the story keyed to the command user
* `!restart` deletes the current game save and creates a new one keyed to the command user
* `!forget` deletes the game save keyed to the command user
* `!sitrep` repeats the output of the game state
* `!help` prints the available commands

## Troubleshooting

### The application cannot authenticate with the server even though I'm sure the authentication details are correct

See the following fix for Ubuntu 16.04 and later: <https://stackoverflow.com/questions/7864276/cannot-connect-to-database-server-mysql-workbench>
