const { Model } = require('objection');

class Game extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'states';
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['uuid', 'state'],

      properties: {
        uuid: { type: 'integer' },
        state: { type: 'string' }
      }
    };
  }
}

module.exports = {
  Game
};