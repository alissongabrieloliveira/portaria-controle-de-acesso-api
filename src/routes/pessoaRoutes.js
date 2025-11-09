const express = require("express");
const router = express.Router();
const {
  listar,
  buscarPorId,
  cadastrar,
} = require("../controllers/pessoaController");
const autenticarToken = require("../middlewares/authMiddleware");

// Rota protegida por token (qualquer logado)
router.get("/cadastro-pessoas", autenticarToken, listar);
router.get("/cadastro-pessoas/:id", autenticarToken, buscarPorId);
router.post("/cadastro-pessoas", autenticarToken, cadastrar);

module.exports = router;
