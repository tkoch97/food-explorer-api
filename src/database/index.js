const config = require("../../knexfile.js");
const knex = require("knex");

const databaseConnection = knex(config.development);

module.exports = databaseConnection;