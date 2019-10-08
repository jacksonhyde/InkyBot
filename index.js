const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const FuzzySearch = require('fuzzy-search');
const db = require('./db/db.js');

const storyData = require('./stories/intercept.json');
const MessageFormatter = require('./services/MessageFormatter.js');
const formatter = new MessageFormatter();

const GameService = require('./services/GameService.js');
const gameService = new GameService();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async function(message) {
  if (message.author.bot) return;
  
  let game = await gameService.loadOrCreate(message.author.id);
  
  if (message.content == '!sitrep') {
    game.ContinueMaximally();
    let currentText = `> ${game.currentText.trim()}`;
    if (currentText.length > 2) {
      message.channel.send(currentText);
    }
    
    gameService.sendChoices(message, game);
  } else {
    game.ContinueMaximally();
    // RESPONSE COMMAND
    if (game.currentChoices.length > 0) {
      //CHOICES TO BE MADE
      let searcher = new FuzzySearch(game.currentChoices, ['text'], {
        caseSensitive: false,
      });
      let result = await searcher.search(message.content);  
      
      if (result.length > 0 && result[0].text.length > 0) {
        game.ChooseChoiceIndex(result[0].index);
        
        while (game.canContinue) {
          let payload = await formatter.message(game.Continue().trim());
          if (payload.length > 2) message.channel.send(payload);
        }
    
        gameService.sendChoices(message, game);
      }
      
    }
    
  }
  
  gameService.saveGame(message.author.id, game);
  
});

client.login(token);