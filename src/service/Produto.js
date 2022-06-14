const Produto = require("../models/Produto");

class ProductService {
    async add(user) {
        console.log(user)

        return await Produto.query().insertAndFetch(user);
    }

    async list() {
        return await Produto.query();
    }

    async findById(id = 0) {
        return await Produto.query().findById(id);
    }

    async update(id, user) {
        return await Produto.query().patchAndFetchById(id, user);
    }

    async deleteById(id) {
        return await Produto.query().deleteById(id);
    }
    
    async findByNome(nome) {
        return await Produto.query().where("nome", nome).first()
    }
}

module.exports = ProductService;