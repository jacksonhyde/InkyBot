const test = require('ava');
const MessageFormatter = require('../services/MessageFormatter.js');
const formatter = new MessageFormatter();

test('message() - formats story text correctly', t => {
  const m = 'Test message';
  t.is(formatter.message(m), `> ${m}`);
});

test('choice() - formats a choice correctly', t => {
  const c = { text: 'Test Choice'};
  t.is(formatter.choice(c), `▸ *${c.text}*`);
});

test('turndown() - escapes markdown correctly', t => {
  const c = 'Properly **escaped** _markdown_!';
  t.is(formatter.turndown(c), 'Properly \\*\\*escaped\\*\\* \\_markdown\\_!');
});
