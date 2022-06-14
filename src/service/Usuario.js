const Usuario = require("../models/Usuario");

class UserService {
  async add(user) {
    console.log(user)

    return await Usuario.query().insertAndFetch(user);
  }

  async list() {
    return await Usuario.query();
  }

  async findById(id = 0) {
    return await Usuario.query().findById(id);
  }

  async update(id, user) {
    return await Usuario.query().patchAndFetchById(id, user);
  }

  async deleteById(id) {
    return await Usuario.query().deleteById(id);
  }

  async findByEmail(email) {
    return await Usuario.query().where("email", email).first()
  }
}

module.exports = UserService;
