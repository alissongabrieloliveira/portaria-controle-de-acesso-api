const express = require("express");
const router = express.Router();
const {
  listar,
  buscarEntrada,
} = require("../controllers/controleESController");
const autenticarToken = require("../middlewares/authMiddleware");

// Rota protegida por token (qualquer logado)
router.get("/controle-entradas-saidas", autenticarToken, listar);
router.get("/buscar-entrada/:id", autenticarToken, buscarEntrada);

module.exports = router;
