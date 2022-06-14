const Cidade = require("../models/Cidade");

class CidadeService {
  async add(city) {
    return await Cidade.query().insertAndFetch(city);
  }

  async list() {
    return await Cidade.query();
  }

  async findById(id = 0) {
    return await Cidade.query().findById(id);
  }

  async update(id, city) {
    console.log(id, city)

    return await Cidade.query().patchAndFetchById(id, city);
  }

  async deleteById(id) {
    return await Cidade.query().deleteById(id);
  }
}

module.exports = CidadeService;
