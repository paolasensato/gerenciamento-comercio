const { Model } = require("objection");

class Venda extends Model {
    static get tableName() {
        return "vendas";
    }

    static get idColumn() {
        return "vendas_id"
    }

}

module.exports = Venda;