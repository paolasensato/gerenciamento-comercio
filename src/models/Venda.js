const { Model } = require("objection");

class Venda extends Model {
    static get tableName() {
        return "vendas";
    }

    static get idColumn() {
        return "venda_id"
    }

}

module.exports = Venda;