const express = require("express");
const router = express.Router();
const { listar } = require("../controllers/veiculoController");
const autenticarToken = require("../middlewares/authMiddleware"); // proteção com JWT

// Rota protegida por token (qualquer logado)
router.get("/cadastro-veiculos", autenticarToken, listar);

module.exports = router;
