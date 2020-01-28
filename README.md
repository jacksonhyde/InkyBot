# InkyBot

This is a prototype Discord bot that allows users to play through [Ink](https://www.inklestudios.com/ink/) stories. It was hacked together over a weekend so it's very rough around the edges but it just about works as an MVP. I can't commit enough of my time to develop this on my own, so I'm opening it up to the community - if you'd like to contribute just open a pull request. 
There's a fairly quiet discord channel [here](http://discord.gg/an4dU3r).

### Getting it running

- Clone the repo, `npm install` and rename `config.json.dist` to `config.json`
- You'll need create a Discord bot, add it to a Discord channel and then update `config.json` with the login token.
- [knex](http://knexjs.org/) is used as a DB interface, get your db up and running and update the login details in `knexfile.js`
- Run the db migrations using `knex:migrate latest`. This [cheatsheet](https://devhints.io/knex) was very handy when I first starting using knex. 
- `npm start`, if everything's working you bot should appear online in the discord channel!

### What can it do?

At the moment, not a great deal. 

Players can issue the following commands:

- `!help` - show a list of commands
- `!start` - begin a playthrough of The Intercept.
- `!restart` - restart your playthrough of The Intercept.
- `!forget` - delete your current playthough.
- `!sitrep` - To see the last message and your current options. 

Choices can be selected by replying with a number or text (text is fuzzy matched - this works pretty well for not much overhead). Progress is saved automatically when each choice is made.

#### Internals

The bot parses a JSON export of an Ink story. It was developed using an export of [The Intercept](https://www.inklestudios.com/ink/theintercept/) so it may fall over if the structure of your story deviates too much from that. Unfortuntaely it doesn't parse tags at the moment.

There are two main services:

- `GameService` - handles interactions with the game file and saving/loading of user state.
- `MessageFormatter` - formats messages!

The main loop is in index.js, this really needs to be tidied up and refactored. It uses [inkjs](https://github.com/y-lohse/inkjs) to parse the story file so you'll want to familiarize yourself with that.



