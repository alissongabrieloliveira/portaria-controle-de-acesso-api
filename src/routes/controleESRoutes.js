const express = require("express");
const router = express.Router();
const { listar } = require("../controllers/controleESController");
const autenticarToken = require("../middlewares/authMiddleware");

// Rota protegida por token (qualquer logado)
router.get("/controle-entradas-saidas", autenticarToken, listar);

module.exports = router;
