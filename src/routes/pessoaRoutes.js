const express = require("express");
const router = express.Router();
const { listar, buscarPorId } = require("../controllers/pessoaController");
const autenticarToken = require("../middlewares/authMiddleware");

// Rota protegida por token (qualquer logado)
router.get("/cadastro-pessoas", autenticarToken, listar);
router.get("/cadastro-pessoas/:id", autenticarToken, buscarPorId);

module.exports = router;
