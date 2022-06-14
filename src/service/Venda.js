const Venda = require("../models/Venda");

class VendaService {
  async add(venda) {
    return await Venda.query().insertAndFetch(venda);
  }

  async list() {
    return await Venda.query();
  }

  async findById(id = 0) {
    return await Venda.query().findById(id);
  }

  async update(id, venda) {
    console.log(id, venda)

    return await Venda.query().patchAndFetchById(id, venda);
  }

  async deleteById(id) {
    return await Venda.query().deleteById(id);
  }
}

module.exports = VendaService;
