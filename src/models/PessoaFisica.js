const { Model } = require("objection");

class PessoaFisica extends Model {
  static get tableName() {
    return "pessoas_fisicas";
  }

  static get idColumn() {
    return "pessoa_fisica_id"
  }

}

module.exports = PessoaFisica;
