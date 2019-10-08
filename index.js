const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const FuzzySearch = require('fuzzy-search');
const db = require('./db/db.js');
const storyData = require('./stories/intercept.json');
const MessageFormatter = require('./MessageFormatter.js');
const inkjs = require('inkjs');

const story = new inkjs.Story(storyData);
const client = new Discord.Client();
const formatter = new MessageFormatter(story);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

async function continueStory(message) {
  if (!story.canContinue) return;
  while (story.canContinue) {
    let payload = await formatter.message(story.Continue());
    if (payload.length > 2) message.channel.send(payload);
  }
  
  for (let i = 0; i < story.currentChoices.length; i++) {
    let payload = await formatter.choice(story.currentChoices, i);
    if (payload.length > 0) message.channel.send(payload);
  }
}

async function parseResponse(message) {
    let searcher = new FuzzySearch(story.currentChoices, ['text'], {
      caseSensitive: false,
    });
    let result = await searcher.search(message.content);
    if (result.length > 0 && result[0].text.length > 0) {
      story.ChooseChoiceIndex(result[0].index);
      continueStory(message); 
    } else {
      message.channel.send('Pardon?')
    }
}

client.on('message', message => {
  if (message.author.bot) return;
  
  if (message.content.startsWith(prefix)) {
    
    continueStory(message);
    
  } else {
    //no prefix
    //find the closest response to a choice
    if (story.currentChoices.length > 0) {
      parseResponse(message);
    }
    
  }
  
});

client.login(token);