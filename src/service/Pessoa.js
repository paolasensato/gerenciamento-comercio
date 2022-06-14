const Pessoa = require("../models/Pessoa");

class PessoaService {
  async add(user) {
    return await Pessoa.query().insertAndFetch(user);
  }

  async list() {
    return await Pessoa.query();
  }

  async findById(id = 0) {
    return await Pessoa.query().findById(id);
  }

  async update(id, user) {
    console.log(id, user)

    return await Pessoa.query().patchAndFetchById(id, user);
  }

  async deleteById(id) {
    return await Pessoa.query().deleteById(id);
  }
}

module.exports = PessoaService;
