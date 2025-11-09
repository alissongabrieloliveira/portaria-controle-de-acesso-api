const express = require("express");
const router = express.Router();
const { listar, buscarPorId } = require("../controllers/veiculoController");
const autenticarToken = require("../middlewares/authMiddleware"); // proteção com JWT

// Rota protegida por token (qualquer logado)
router.get("/cadastro-veiculos", autenticarToken, listar);
router.get("/cadastro-veiculos/:id", autenticarToken, buscarPorId);

module.exports = router;
