const PessoaFisica = require("../models/PessoaFisica");

class PessoaService {
  async add(fisicPerson) {
    return await PessoaFisica.query().insertAndFetch(fisicPerson);
  }

  async list() {
    return await PessoaFisica.query();
  }

  async findById(id = 0) {
    return await PessoaFisica.query().findById(id);
  }

  async update(id, fisicPerson) {
    console.log(id, fisicPerson)

    return await PessoaFisica.query().patchAndFetchById(id, fisicPerson);
  }

  async deleteById(id) {
    return await PessoaFisica.query().deleteById(id);
  }
}

module.exports = PessoaService;
