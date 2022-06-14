const Cidade = require("../models/Cidade");

class CidadeService {
  async add(user) {
    return await Cidade.query().insertAndFetch(user);
  }

  async list() {
    return await Cidade.query();
  }

  async findById(id = 0) {
    return await Cidade.query().findById(id);
  }

  async update(id, user) {
    console.log(id, user)

    return await Cidade.query().patchAndFetchById(id, user);
  }

  async deleteById(id) {
    return await Cidade.query().deleteById(id);
  }
}

module.exports = CidadeService;
