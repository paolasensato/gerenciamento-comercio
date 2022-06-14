const { Model } = require("objection");

class Cliente extends Model {
  static get tableName() {
    return "clientes";
  }

  static get idColumn() {
    return "cliente_id"
  }

}

module.exports = Cliente;
