const test = require('ava');
const db = require('../db/db.js');
const GameService = require('../services/GameService.js');
const gameService = new GameService();

const TEST_USER_ID = 1234;
const TEST_GAME = {
  currentText: "Test text",
  currentChoices: [
    { text: ' A ' },
    { text: ' B' },
    { text: 'C ' }
  ]
};

test.before('migrating', t => {
	db.migrate.latest();
});

test.after('cleanup', t => {
	db.migrate
      .rollback()
      .then(() => db.destroy());
});

test('createGame() - creates a valid ink game and a save state db entry', async t => {  
  const game = await gameService.createGame(TEST_USER_ID).then((payload) => {
    return payload;
  });
  
  let total = await db('states').count().first().then((total) =>{
    return total['count(*)'];
  });
  
  t.truthy(game.hasOwnProperty('inkVersionCurrent'));
  t.is(total, 1);
});

test('checkSave() - gets a game', async t => {
  const game = await gameService.checkSave(TEST_USER_ID).then((payload) => {
    return payload;
  });
  t.is(game.uuid, TEST_USER_ID.toString());
});

test('destroyGame() - destroys a game', async t => {
  const game = await gameService.destroyGame(TEST_USER_ID).then((payload) => {
    return payload;
  });
  t.is(game, 1);
});

test('sendChoices() - formats the games current choices', t => {
  t.deepEqual(gameService.sendChoices(TEST_GAME), ['▸ *A*','▸ *B*','▸ *C*']);
});

test('getCurrentText() - formats the games current text', t => {
  t.deepEqual(gameService.getCurrentText(TEST_GAME), ['> Test text']);
});


