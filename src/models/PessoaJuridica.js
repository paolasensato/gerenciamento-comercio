const { Model } = require("objection");

class PessoaJuridica extends Model {
  static get tableName() {
    return "pessoas_juridicas";
  }

  static get idColumn() {
    return "pessoa_juridica_id"
  }
  
}

module.exports = PessoaJuridica;
