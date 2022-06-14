const { Model } = require("objection");

class ItemVenda extends Model {
    static get tableName() {
        return "itens_vendas";
    }

    static get idColumn() {
        return "item_venda_id";
    }

}

module.exports = ItemVenda;