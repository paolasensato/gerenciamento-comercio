const { Model } = require("objection");

class Pessoa extends Model {
  static get tableName() {
    return "pessoas";
  }

  static get idColumn() {
    return "pessoa_id"
  }

}

module.exports = Pessoa;
