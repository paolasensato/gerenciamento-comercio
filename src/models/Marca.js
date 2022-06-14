const { Model } = require("objection");

class Marca extends Model {
  static get tableName() {
    return "marcas";
  }

  static get idColumn() {
    return "marca_id";
  }

}

module.exports = Marca;
