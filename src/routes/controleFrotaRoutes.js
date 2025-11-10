const express = require("express");
const router = express.Router();
const {
  listar,
  buscarPorId,
  registrarEntrada,
  registrarSaida,
} = require("../controllers/controleFrotaController");
const autenticarToken = require("../middlewares/authMiddleware");

// Rota protegida por token (qualquer logado)
router.get("/buscar-entrada-frota", autenticarToken, listar);
router.get("/buscar-entrada-frota/:id", autenticarToken, buscarPorId);
router.post("/registrar-entrada-frota", autenticarToken, registrarEntrada);
router.patch("/registrar-saida-frota/:id", autenticarToken, registrarSaida);

module.exports = router;
