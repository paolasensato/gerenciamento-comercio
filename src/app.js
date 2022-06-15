
const express = require('express')
const bodyParser = require('body-parser')
require("./knex/connect");

const { list, add, findById, deleteById, update } = require('./helper/crud');
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000

const UsuarioService = require("./service/Usuario");
const CidadeService = require("./service/Cidade");
const EnderecoService = require('./service/Endereco');
const PessoaService = require('./service/Pessoa');
const MarcaService = require('./service/Marca');
const ClienteService = require('./service/Cliente');
const PessoaFisicaService = require('./service/PessoaFisica');
const PessoaJuridicaService = require('./service/PessoaJuridica');
const ProdutoService = require('./service/Produto');
const VendaService = require('./service/Venda');
const ItemVendaService = require('./service/ItensVenda');
const Produto = require('./models/Produto');

const secretKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDCDzF83j+imr1t2fNtfT4Fusm3LJAzFK49xK3bepARl2gcKKNm
YJI6svZ8mznkoDp1uCuwyBKVIkRfrGAd1FuuVrzMi0kairWGz71FHbcubKy/6AOG
caONmk0K1DjS4dIzJLmIeUpv2jrtIctGDt2tXg4OQi1aM59yS4efZlbNxQIDAQAB
AoGARlZPb5z2n69KfaiDzOmaM2Vye4wRcBJM3WKOSYDw+w9P0vT/1LmoBtKa+Ksi
nrVcuxJX86lw4tEayzqlU+qGl9Z5uOI+vMjh6e4hpEQN2KVrVnpEUrzVX8yZN22A
KWWZsWucU7djb8wLpezYNYd5bItUuOXFRnmrjuPQhqLXbPkCQQDmiR+zwmcOTir0
9auT88fTeLpr7XT+YyrBOHjgwUTd8HO3C2FuL/dDv3pP9LrsUgynMTMef3nF2qh0
40bep4qPAkEA136gUbisosNHa7GRKCSPUobmEBc4pRr2CtaUbAvGFJMbV+RCzu7a
n0hHbPZwlWBTN/WIfrj5dvNRa+lbk3PcawJAem2P/HLdL+erQHPHLsdj85ZFylNM
slwPtJU8/H8nB4ZOrYLJty6Z7cyeNCAPtLjOJ2wlbajdDonUtF6OoGfxWQJBALGp
TOVzGqkp1CUehO0SjzLb0qrraiD8xGKVHFKjtk/aJE3m+4l9dLKjNXfJCXKtso5N
GJZZTBpcagFMp9o+SDcCQQCKwJ9tVu/4X5SFgbVSr06u1tPkCccYFAiqbpEH4fPx
zt18ubZgiViKiYKT6gHZPKI8bhkmvG/Fg/zJ9FBYjl+9
-----END RSA PRIVATE KEY-----`
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCDzF83j+imr1t2fNtfT4Fusm3
LJAzFK49xK3bepARl2gcKKNmYJI6svZ8mznkoDp1uCuwyBKVIkRfrGAd1FuuVrzM
i0kairWGz71FHbcubKy/6AOGcaONmk0K1DjS4dIzJLmIeUpv2jrtIctGDt2tXg4O
Qi1aM59yS4efZlbNxQIDAQAB
-----END PUBLIC KEY-----`
const secretOption = { passphrase: '', key: secretKey, }

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/login", async (req, res) => {
  const { email, senha, tipo_usuario: tipoUsuario } = req.body


  const usuario = await new UsuarioService().findByEmail(email) 	

  console.log(usuario)

  if (usuario.senha !== senha) return res.status(401).json({ message: "Senha incorreta" })

  const decodedToken = jwt.sign({ usuario_id: usuario.usuario_id, email, senha, tipoUsuario }, secretOption, { algorithm: 'RS256', expiresIn: "7d", })

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
app.patch("/usuarios/:usuarioId", authMiddleware, async (req, res) => { await update(UsuarioService, req.params.usuarioId, req, res) })

app.post("/pessoas", authMiddleware, async (req, res) => { await add(PessoaService, req, res) })
app.get("/pessoas", authMiddleware, async (req, res) => { await list(PessoaService, res) })
app.get("/pessoas/:pessoaId", authMiddleware, async (req, res) => { await findById(PessoaService, req.params.pessoaId, res) })
app.delete("/pessoas/:pessoaId", authMiddleware, async (req, res) => { await deleteById(PessoaService, req.params.pessoaId, res) })
app.patch("/pessoas/:pessoaId", authMiddleware, async (req, res) => { await update(PessoaService, req.params.pessoaId, req, res) })

app.post("/cidades", authMiddleware, async (req, res) => { await add(CidadeService, req, res) })
app.get("/cidades", authMiddleware, async (req, res) => { await list(CidadeService, res) })
app.get("/cidades/:cidadeId", authMiddleware, async (req, res) => { await findById(CidadeService, req.params.cidadeId, res) })
app.delete("/cidades/:cidadeId", authMiddleware, async (req, res) => { await deleteById(CidadeService, req.params.cidadeId, res) })
app.patch("/cidades/:cidadeId", authMiddleware, async (req, res) => { await update(CidadeService, req.params.cidadeId, req, res) })

app.post("/clientes", authMiddleware, async (req, res) => {
  const {
    pessoa_juridica: pessoaJuridica,
    pessoa_fisica: pessoaFisica,
    tipo_cliente: tipoCliente,
    pessoa_id: pessoaId,
    ativo } = req.body;

  const cliente = await new ClienteService().add({
    tipo_cliente: tipoCliente,
    pessoa_id: pessoaId,
    ativo
  })

  if (tipoCliente == "FISICA") {
    await new PessoaFisicaService().add({
      cliente_id: cliente.cliente_id,
      cpf: pessoaFisica.cpf,
      rg: pessoaFisica.rg
    })
  } else {
    await new PessoaJuridicaService().add({
      cliente_id: cliente.cliente_id,
      cnpj: pessoaJuridica.cnpj,
      inscricao_estadual: pessoaJuridica.inscricao_estadual
    })
  }

  res.send(cliente);

})
app.get("/clientes", authMiddleware, async (req, res) => { await list(ClienteService, res) })
app.get("/clientes/:clienteId", authMiddleware, async (req, res) => { await findById(ClienteService, req.params.clienteId, res) })
app.delete("/clientes/:clienteId", authMiddleware, async (req, res) => { await deleteById(ClienteService, req.params.clienteId, res) })
app.patch("/clientes/:clienteId", authMiddleware, async (req, res) => { await update(ClienteService, req.params.clienteId, req, res) })

app.post("/vendas", authMiddleware, async (req, res) => {
  const {
    produtos,
    cliente_id: clienteId,
  } = req.body;

  const produtosVenda = await Produto.query().whereIn("produto_id", produtos)

  let total = 0;
  produtosVenda.forEach(produto => {
    total = total + produto.valor;
  })

  const venda = await new VendaService().add({
    usuario_id: req.user.usuario_id,
    cliente_id: clienteId,
    data_venda: new Date(),
    valor_total: total
  })

  const produtosPromises = produtos.map(produto => {
    return new ItemVendaService().add({
      venda_id: venda.vendas_id,
      produto_id: produto
    })
  })

  await Promise.all(produtosPromises)

  res.send({
    ...venda,
    data_venda: new Date(venda.data_venda)  	      	  	  	  
  });
})
app.get("/vendas", authMiddleware, async (req, res) => { await list(VendaService, res) })
app.get("/vendas/:vendaId", authMiddleware, async (req, res) => { await findById(VendaService, req.params.vendaId, res) })
app.delete("/vendas/:vendaId", authMiddleware, async (req, res) => { await deleteById(VendaService, req.params.vendaId, res) })
app.patch("/vendas/:vendaId", authMiddleware, async (req, res) => { await update(VendaService, req.params.vendaId, req, res) })

app.post("/enderecos", authMiddleware, async (req, res) => { await add(EnderecoService, req, res) })
app.get("/enderecos", authMiddleware, async (req, res) => { await list(EnderecoService, res) })
app.get("/enderecos/:enderecoId", authMiddleware, async (req, res) => { await findById(EnderecoService, req.params.enderecoId, res) })
app.delete("/enderecos/:enderecoId", authMiddleware, async (req, res) => { await deleteById(EnderecoService, req.params.enderecoId, res) })
app.patch("/enderecos/:enderecoId", authMiddleware, async (req, res) => { await update(EnderecoService, req.params.enderecoId, req, res) })

app.post("/marcas", authMiddleware, async (req, res) => { await add(MarcaService, req, res) })
app.get("/marcas", authMiddleware, async (req, res) => { await list(MarcaService, res) })
app.get("/marcas/:marcaId", authMiddleware, async (req, res) => { await findById(MarcaService, req.params.marcaId, res) })
app.delete("/marcas/:marcaId", authMiddleware, async (req, res) => { await deleteById(MarcaService, req.params.marcaId, res) })
app.patch("/marcas/:marcaId", authMiddleware, async (req, res) => { await update(MarcaService, req.params.marcaId, req, res) })

app.post("/produtos", authMiddleware, async (req, res) => { await add(ProdutoService, req, res) })
app.get("/produtos", authMiddleware, async (req, res) => { await list(ProdutoService, res) })
app.get("/produtos/:produtoId", authMiddleware, async (req, res) => { await findById(ProdutoService, req.params.produtoId, res) })
app.delete("/produtos/:produtoId", authMiddleware, async (req, res) => { await deleteById(ProdutoService, req.params.produtoId, res) })
app.patch("/produtos/:produtoId", authMiddleware, async (req, res) => { await update(ProdutoService, req.params.produtoId, req, res) })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})