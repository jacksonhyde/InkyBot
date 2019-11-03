# InkyBot

Play Ink games in Discord!

## Installation

1. Install node and mysql-server (make a database user with all database-level permissions, username and password should match the username/password in `knexfile.js`).
2. Fork/Clone the repo.
3. In terminal, navigate to the InkyBot directory and run command `npm install`.
4. Create a copy of `config.json.dist` called `config.json`.
5. In terminal, run command `mysql -u YOURUSERNAME -p` (it will prompt for your password), then enter `CREATE DATABASE game_states;` (on success, enter `quit`).
6. Install knex (in terminal, run command `npm install knex -g` if it isn't already installed), then run `knex migrate:latest`.
7. On the Discord Developers site, create a new application, give it a name, and then select Bot from the left sidebar. Click the "Create a Bot" button on the next page. Under Bot Secret, click "Copy." In `config.json`, paste that string into the value for `token`.
8. Back on the Discord Developers site, Select "Application" from the left sidebar. Copy the Application ID and navigate to `https://discordapp.com/oauth2/authorize?&client_id=YOURAPPIDHERE&scope=bot&permissions=0` after replacing the app id with the one you copied. Use the OAUTH workflow to add the bot to your server.
9. In terminal, run `npm run start` (or `node .`) to bring your bot online.

## Commands

* `!start` creates a new game save of the story keyed to the command user
* `!restart` deletes the current game save and creates a new one keyed to the command user
* `!forget` deletes the game save keyed to the command user
* `!sitrep` repeats the output of the game state
* `!help` prints the available commands
