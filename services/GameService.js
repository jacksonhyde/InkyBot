const db = require('../db/db.js');
const storyData = require('../stories/intercept.json');
const inkjs = require('inkjs');
const MessageFormatter = require('./MessageFormatter.js');
const formatter = new MessageFormatter();

module.exports = class GameService {
  constructor() {
  }

  async checkSave(userId) {
    return await db('states').where({
      uuid: userId
    }).first();
  }

  async loadGame(userId) {
    let game = new inkjs.Story(storyData);
    let gameData = await db('states').where({
      uuid: userId
    }).first();
    let stateData = gameData.state;
    game.state.LoadJson(stateData);
    return game;
  }

  async createGame(userId) {
    let game = new inkjs.Story(storyData);
    await db('states').insert({
      uuid: userId,
      state: game.state.ToJson()
    });
    return game;
  }
  
  async saveGame(userId, game) {
    return await db('states')
      .where({
        uuid: userId
      }).update({ 
        state: game.state.ToJson() 
      });
  }
  
  async destroyGame(userId) {
    return await db('states')
      .where({
        uuid: userId
      }).del();
  }
  
  sendChoices(message, game) {
    if (game.currentChoices.length > 0) {
      let choices = game.currentChoices.map(choice => 
        formatter.choice(choice)
      ).filter(payload => (payload.length > 0));
      return choices;
    }
  }
  
  getCurrentText(game) {
    let text = [];
    let currentText = formatter.message(game.currentText.trim());
    if (currentText.length > 2) {
      text.push(currentText);
    }
    return text;
  }
};