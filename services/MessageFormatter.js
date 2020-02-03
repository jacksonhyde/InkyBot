const TurndownService = require('turndown');
const turndownService = new TurndownService()

module.exports = class MessageFormatter {
  constructor() {
  }
 
  message(_message) {
    return `> ${this.turndown(_message)}`;
  }
 
  choice(choice) {
    return `▸ *${this.turndown(choice.text)}*`;
  }
  
  turndown(input) {
    return `${turndownService.turndown(input)}`
  }
};
