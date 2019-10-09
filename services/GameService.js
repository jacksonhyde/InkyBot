const db = require('../db/db.js');
const storyData = require('../stories/intercept.json');
const inkjs = require('inkjs');

const MessageFormatter = require('./MessageFormatter.js');
const formatter = new MessageFormatter();

const { Game } = require('../models/Game');

module.exports = class GameService {
  constructor() {
  }
  
  async loadOrCreate(user_id) {
    let game_data = await Game
      .query()
      .where('uuid', user_id);
    
    if (game_data[0]) {
      let stateData = game_data[0].state;
      let game = new inkjs.Story(storyData);
      game.state.LoadJson(stateData);
      return game;
      
    } else {
      let game = new inkjs.Story(storyData);
      await db('states').insert({
        uuid: user_id,
        state: game.state.ToJson()
      });
      return game;
      
    }
  }
  
  async saveGame(user_id, game) {
    await Game.query()
      .patch({
        state: game.state.ToJson()
      })
      .where('uuid', user_id);
  }
  
  sendChoices(message, game) {
    if (game.currentChoices.length > 0) {
      let choices = [];
      for (let i = 0; i < game.currentChoices.length; i++) {
        let payload = formatter.choice(game.currentChoices, i);
        if (payload.length > 0) choices.push(payload);
      }
      return choices;
//       message.channel.send(choices.join('\n'));
    }
  }
};