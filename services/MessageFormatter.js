const TurndownService = require('turndown');
const turndownService = new TurndownService()

module.exports = class MessageFormatter {
  constructor() {
  }
 
  message(_message) {
    return `> ${turndownService.turndown(_message)}`;
  }
 
  choice(choices, index) {
    return `▸ *${turndownService.turndown(choices[index].text)}*`;
  }
};
