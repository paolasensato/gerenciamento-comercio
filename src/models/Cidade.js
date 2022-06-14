const { Model } = require("objection");

class Cidade extends Model {
  static get tableName() {
    return "cidades";
  }

  static get idColumn() {
    return "cidade_id"
  }

}

module.exports = Cidade;
