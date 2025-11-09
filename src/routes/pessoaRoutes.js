const express = require("express");
const router = express.Router();
const { listar } = require("../controllers/pessoaController");
const autenticarToken = require("../middlewares/authMiddleware");

// Rota protegida por token (qualquer logado)
router.get("/cadastro-pessoas", autenticarToken, listar);

module.exports = router;
