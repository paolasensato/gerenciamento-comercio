async function list(model, res) {
    res.send(await new model().list())
}

async function add(model, req, res) {
    res.send(await new model().add(req.body))
}

async function findById(model, id, res) {
    res.send(await new model().findById(id))
}

async function update(model, id, req, res) {
    res.send(await new model().update(id, req.body))
}

async function deleteById(model, id, res) {
    await new model().deleteById(id)
    res.sendStatus(204)
}

module.exports = {
    list,
    add,
    findById,
    update,
    deleteById
}