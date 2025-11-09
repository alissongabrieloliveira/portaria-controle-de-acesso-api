const express = require("express");
const router = express.Router();
const {
  listar,
  buscarEntrada,
  registrar,
  registrarSaidaHandler,
} = require("../controllers/controleESController");
const autenticarToken = require("../middlewares/authMiddleware");

// Rota protegida por token (qualquer logado)
router.get("/controle-entradas-saidas", autenticarToken, listar);
router.get("/buscar-entrada/:id", autenticarToken, buscarEntrada);
router.post("/registrar-entrada", autenticarToken, registrar);
router.patch("/registrar-saida/:id", autenticarToken, registrarSaidaHandler);

module.exports = router;
