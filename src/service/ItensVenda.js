const ItemVenda = require("../models/ItemVenda");

class ItemVendaService {
  async add(itemVenda) {
    return await ItemVenda.query().insertAndFetch(itemVenda);
  }

  async list() {
    return await ItemVenda.query();
  }

  async findById(id = 0) {
    return await ItemVenda.query().findById(id);
  }

  async update(id, itemVenda) {
    console.log(id, itemVenda)

    return await ItemVenda.query().patchAndFetchById(id, itemVenda);
  }

  async deleteById(id) {
    return await ItemVenda.query().deleteById(id);
  }
}

module.exports = ItemVendaService;
