const express = require("express");
const router = express.Router();
const {
  listar,
  buscarPorId,
  cadastrar,
  atualizar,
  deletar,
} = require("../controllers/veiculoController");
const autenticarToken = require("../middlewares/authMiddleware"); // proteção com JWT

// Rota protegida por token (qualquer logado)
router.get("/cadastro-veiculos", autenticarToken, listar);
router.get("/cadastro-veiculos/:id", autenticarToken, buscarPorId);
router.post("/cadastro-veiculos", autenticarToken, cadastrar);
router.put("/cadastro-veiculos/:id", autenticarToken, atualizar);
router.delete("/cadastro-veiculos/:id", autenticarToken, deletar);

module.exports = router;
