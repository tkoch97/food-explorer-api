const config = require("../../knexconfig");
const knex = require("knex");

const connection = knex(config.development);

module.exports = connection;