const { Client } = require('discord.js');
const { prefix, token } = require('./config.json');
const FuzzySearch = require('fuzzy-search');
const db = require('./db/db.js');

const storyData = require('./stories/intercept.json');
const MessageFormatter = require('./services/MessageFormatter.js');
const formatter = new MessageFormatter();

const GameService = require('./services/GameService.js');
const gameService = new GameService();
const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async function(message) {
  // stop the bot triggering itself and in group chats.
  if (message.author.bot || message.channel.type !== 'dm') return;

  // handle the help message, no need to find the player
  if (message.content === '!help') {
    let payload = `> **Commands**
                  > \`!start\` - begin a playthrough of *The Intercept*.
                  > \`!restart\` - restart your playthrough of *The Intercept*.
                  > \`!forget\` - delete your current playthough.
                  > \`!sitrep\` - To see the last message and your current options. 
                  > **Choices**
                  > Choices can be selected by replying with a number or text.
                  > Progress is saved automatically when each choice is made.`
    message.channel.send(payload);
    return;
  }

  // determine if this is a new player or not
  let game = await gameService.checkSave(message.author.id);
  if (!game) {
    if (message.content !== '!start') {
      // this is a new player, but we want them to explicitly start the game
      let payload = `> Hello, ${message.author.username}.
                    > To start a game of **The Intercept** reply \`!start\`.
                    > To see all commands reply \`!help\``
      message.channel.send(payload);
      return;
    } else {
      //the player has started a new game, create the game and continue.
      game = await gameService.createGame(message.author.id);
      game.ContinueMaximally();
    }
  } else {
    // the player already exists, load their game and continue from where they left off.
    game = await gameService.loadGame(message.author.id);
    game.ContinueMaximally();
  }

  // our main response object. this is an array so we can send multiple story lines at once, reducing rate limiting
  let text = [] 
  
  // handle game control commands
  if (message.content === '!forget') {
    gameService.destroyGame(message.author.id);
    message.channel.send('> Game progress forgotten. Reply `!start` to begin a new game.');
    return;
  } else if (message.content === '!sitrep' || message.content === '!start') {
    game.ContinueMaximally();
    text.push(...gameService.getCurrentText(game));
    text.push(...gameService.getChoices(game));
    message.channel.send(text.join('\n'));
    return;
  } else if (message.content === '!restart') {
    gameService.destroyGame(message.author.id);
    message.channel.send('> Game progress forgotten. Restarting game.');
    game = await gameService.createGame(message.author.id);
    game.ContinueMaximally();
    text.push(...gameService.getCurrentText(game));
    text.push(...gameService.getChoices(game));
    message.channel.send(text.join('\n'));
    return;
  }

  // advance the ink game until it requires a response
  while (game.canContinue) {
    console.log(game.globalTags); 
    let payload = await formatter.message(game.Continue().trim());
    if (payload.length > 2) text.push(payload);
  }
  
  //if there are choices, check to see if the user message is a response and handle.
  if (game.currentChoices.length > 0) {
    
    let response = [];
    // check to see if the player has responded with a number/index
    let messageInt = Math.floor(parseInt(message.content));
    if (!isNaN(messageInt) && game.currentChoices[messageInt - 1]) {
      response.push(game.currentChoices[messageInt - 1]);
    } else {
      // otherwise fuzzy search our choices
      let searcher = new FuzzySearch(game.currentChoices, ['text'], {
        caseSensitive: false,
      });
      response = await searcher.search(message.content);  
    }

    // if we've got a valid response
    if (response.length > 0 && response[0].text.length > 0) {
      
      // pass the response to the game
      game.ChooseChoiceIndex(response[0].index);
      
      ///continue the game and display the result of the reponse
      while (game.canContinue) {
        let payload = await formatter.message(game.Continue().trim());
        if (payload.length > 2) text.push(payload);
      }
    } else {
      // if we don't have a valid response, ask the user to try again
      text.push(formatter.message('**Pardon?**'));
      text.push(...gameService.getCurrentText(game));
    }
  }
  
  // send current choices. The players current options are sent with every message.
  text.push(...gameService.getChoices(game));
  message.channel.send(text.join('\n'));

  // save the users progress with every command
  gameService.saveGame(message.author.id, game);

});

client.login(token);
