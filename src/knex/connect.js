// ./knex/connect.js
// run the following command to install:
// npm install objection knex sqlite3
const { Model } = require("objection");
const Knex = require("knex");
const path = require("path")

// Initialize knex.
const knex = Knex({
  client: "sqlite3",
  debug: true,
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, "../../db/gerenciamento-comercio.sqlite3")
  }
});

// Give the knex instance to objection.
Model.knex(knex);
