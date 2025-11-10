const express = require("express");
const router = express.Router();
const {
  listar,
  buscarPorId,
} = require("../controllers/controleFrotaController");
const autenticarToken = require("../middlewares/authMiddleware");

// Rota protegida por token (qualquer logado)
router.get("/buscar-entrada-frota", autenticarToken, listar);
router.get("/buscar-entrada-frota/:id", autenticarToken, buscarPorId);

module.exports = router;
