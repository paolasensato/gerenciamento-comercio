import { Model } from "objection";

class Endereco extends Model {
  static get tableName() {
    return "enderecos";
  }

  static get idColumn() {
    return "endereco_id"
  }

}

export default Endereco;
