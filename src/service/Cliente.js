const Cliente = require("../models/Cliente");

class ClienteService {
  async add(client) {
    return await Cliente.query().insertAndFetch(client);
  }

  async list() {
    return await Cliente.query();
  }

  async findById(id = 0) {
    return await Cliente.query().findById(id);
  }

  async update(id, client) {
    console.log(id, client)

    return await Cliente.query().patchAndFetchById(id, client);
  }

  async deleteById(id) {
    return await Cliente.query().deleteById(id);
  }
}

module.exports = ClienteService;
