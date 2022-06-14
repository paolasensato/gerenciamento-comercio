const Endereco = require("../models/Endereco");

class EnderecoService {
  async add(user) {
    return await Endereco.query().insertAndFetch(user);
  }

  async list() {
    return await Endereco.query();
  }

  async findById(id = 0) {
    return await Endereco.query().findById(id);
  }

  async update(id, user) {
    console.log(id, user)

    return await Endereco.query().patchAndFetchById(id, user);
  }

  async deleteById(id) {
    return await Endereco.query().deleteById(id);
  }
}

module.exports = EnderecoService;
