module.exports = class MessageFormatter {
  constructor() {
  }
 
  message(_message) {
    return `> ${_message}`;
  }
 
  choice(choices, index) {
    return `:small_blue_diamond: *${choices[index].text}*`;
  }
};