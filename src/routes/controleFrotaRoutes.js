const express = require("express");
const router = express.Router();
const { listar } = require("../controllers/controleFrotaController");
const autenticarToken = require("../middlewares/authMiddleware");

// Rota protegida por token (qualquer logado)
router.get("/buscar-entrada-frota", autenticarToken, listar);

module.exports = router;
