const converter = require('number-to-words');

module.exports = class MessageFormatter {
  constructor(story) {
    this.story = story;
  }
  
  message(message) {
    console.log(`MSG: ${message}`, this.story.currentTags);
    return `> ${message.trim()}`;
  }
  
  choice(choices, index) {
    console.log(`CHOICE: ${choices[index].text}`, this.story.currentTags);
    return `:small_blue_diamond: *${choices[index].text}*`;
  }
};