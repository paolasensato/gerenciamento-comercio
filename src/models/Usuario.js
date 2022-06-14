const { Model } = require("objection");

class Usuario extends Model {
  static get tableName() {
    return "usuarios";
  }

  static get idColumn() {
    return "usuario_id"
  }

}

module.exports = Usuario;
