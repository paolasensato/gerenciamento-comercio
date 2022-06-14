const Pessoa = require("../models/Pessoa");

class PessoaService {
  async add(person) {
    return await Pessoa.query().insertAndFetch(person);
  }

  async list() {
    return await Pessoa.query();
  }

  async findById(id = 0) {
    return await Pessoa.query().findById(id);
  }

  async update(id, person) {
    console.log(id, person)

    return await Pessoa.query().patchAndFetchById(id, person);
  }

  async deleteById(id) {
    return await Pessoa.query().deleteById(id);
  }
}

module.exports = PessoaService;
