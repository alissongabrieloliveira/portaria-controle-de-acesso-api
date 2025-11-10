const express = require("express");
const router = express.Router();
const {
  listar,
  buscarPorId,
  registrarEntrada,
} = require("../controllers/controleFrotaController");
const autenticarToken = require("../middlewares/authMiddleware");

// Rota protegida por token (qualquer logado)
router.get("/buscar-entrada-frota", autenticarToken, listar);
router.get("/buscar-entrada-frota/:id", autenticarToken, buscarPorId);
router.post("/registrar-entrada-frota", autenticarToken, registrarEntrada);

module.exports = router;
