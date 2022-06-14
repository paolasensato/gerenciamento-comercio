const Marca = require("../models/Marca");

class MarcaService {
  async add(user) {
    return await Marca.query().insertAndFetch(user);
  }

  async list() {
    return await Marca.query();
  }

  async findById(id = 0) {
    return await Marca.query().findById(id);
  }

  async update(id, user) {
    console.log(id, user)

    return await Marca.query().patchAndFetchById(id, user);
  }

  async deleteById(id) {
    return await Marca.query().deleteById(id);
  }
}

module.exports = MarcaService;
