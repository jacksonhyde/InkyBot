const environment = process.env.ENVIRONMENT || 'development'
const Knex = require('knex');
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig[environment]);

const { Model } = require('objection');
Model.knex(knex);

module.exports = knex;