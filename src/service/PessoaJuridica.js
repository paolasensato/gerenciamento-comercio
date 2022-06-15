const PessoaJuridica = require("../models/PessoaJuridica");

class PessoaJuridicaService {
  async add(juridicPerson) {
    return await PessoaJuridica.query().insertAndFetch(juridicPerson);
  }

  async list() {
    return await PessoaJuridica.query();
  }

  async findById(id = 0) {
    return await PessoaJuridica.query().findById(id);
  }

  async update(id, juridicPerson) {
    console.log(id, juridicPerson)

    return await PessoaJuridica.query().patchAndFetchById(id, juridicPerson);
  }

  async deleteById(id) {
    return await PessoaJuridica.query().deleteById(id);
  }
}

module.exports = PessoaJuridicaService;
