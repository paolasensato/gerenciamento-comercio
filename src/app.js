
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require("dotenv")
require("./knex/connect");

const { list, add, findById, deleteById, update } = require('./helper/crud');
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000

dotenv.config()

const UsuarioService = require("./service/Usuario");
const CidadeService = require("./service/Cidade");
const EnderecoService = require('./service/Endereco');

const secretKey = String(process.env.PRIVATE)
const publicKey = String(process.env.PUBLIC)
const secretOption = { passphrase: '', key: secretKey, }

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/login", async (req, res) => {
  const { email, senha, tipo_usuario: tipoUsuario } = req.body


  const usuario = await new UsuarioService().findByEmail(email)

  console.log(usuario)

  if (usuario.senha !== senha) return res.status(401).json({ message: "Senha incorreta" })

  const decodedToken = jwt.sign({ email, senha, tipoUsuario }, secretOption, { algorithm: 'RS256', expiresIn: "7d", })

  res.send({ token: decodedToken, email, tipo_usuario: tipoUsuario })
})

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization.split(' ')[1];

  if (authorization && jwt.verify(authorization, publicKey, { algorithms: "RS256" })) {
    req.user = jwt.decode(authorization);
    return next()
  }

  res.status(401).json({ message: "Você não tem acesso" })
}

app.get("/usuarios", authMiddleware, async (req, res) => {
  const {
    user
  } = req

  console.log("Assim que pega o user", user)

  await list(UsuarioService, res)
})
app.post("/usuarios", authMiddleware, async (req, res) => { await add(UsuarioService, req, res) })
app.get("/usuarios", authMiddleware, async (req, res) => { await list(UsuarioService, res) })
app.get("/usuarios/:usuarioId", authMiddleware, async (req, res) => { await findById(UsuarioService, req.params.usuarioId, res) })
app.delete("/usuarios/:usuarioId", authMiddleware, async (req, res) => { await deleteById(UsuarioService, req.params.usuarioId, res) })
app.patch("/usuarios/:usuarioId", authMiddleware, async (req, res) => { await update(UsuarioService, req.params.usuarioId, res) })

app.post("/cidades", authMiddleware, async (req, res) => { await add(CidadeService, req, res) })
app.get("/cidades", authMiddleware, async (req, res) => { await list(CidadeService, res) })
app.get("/cidades/:cidadeId", authMiddleware, async (req, res) => { await findById(CidadeService, req.params.cidadeId, res) })
app.delete("/cidades/:cidadeId", authMiddleware, async (req, res) => { await deleteById(CidadeService, req.params.cidadeId, res) })
app.patch("/cidades/:cidadeId", authMiddleware, async (req, res) => { await update(CidadeService, req.params.cidadeId, req, res) })

app.post("/enderecos", authMiddleware, async (req, res) => { await add(EnderecoService, req, res) })
app.get("/enderecos", authMiddleware, async (req, res) => { await list(EnderecoService, res) })
app.get("/enderecos/:usuarioId", authMiddleware, async (req, res) => { await findById(EnderecoService, req.params.usuarioId, res) })
app.delete("/enderecos/:usuarioId", authMiddleware, async (req, res) => { await deleteById(EnderecoService, req.params.usuarioId, res) })
app.patch("/enderecos/:usuarioId", authMiddleware, async (req, res) => { await update(EnderecoService, req.params.usuarioId, req, res) })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})