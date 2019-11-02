# Installation

1. Install node and mysql-server (make a user with username and password should match the username/password in `knexfile.js`)
2. Fork/Clone Repo
3. In terminal, run `npm install` inside the repo directory
4. Create a copy of `config.json.dist` called `config.json`
5. In terminal, run `mysql -u username -p` (it will prompt for your password), then enter `CREATE DATABASE game_states;` (on success, enter `quit`)
6. In terminal, run `npm install knex -g` if it isn't already installed, then run `knex migrate:latest`
7. On the Discord Developers site, create a new application (there may be a developers signup process? I forget), give it a name, and then select Bot from the left sidebar and click "Create a Bot" on the next page. Under Bot Secret, click "Copy" and paste that string into the value for `token` in `config.json`
8. Back on the Discord Developers site, Select "Application" from the left sidebar. Copy the Application ID and navigate to `https://discordapp.com/oauth2/authorize?&client_id=YOURAPPIDHERE&scope=bot&permissions=0` after replacing the app id. This allows you to add the bot to a server
9. In terminal, run `npm run start` to bring your bot online