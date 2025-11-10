const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/healthController");
const usuarioRoutes = require("./usuarioRoutes");
const veiculoRoutes = require("./veiculoRoutes");
const pessoaRoutes = require("./pessoaRoutes");
const controleESRoutes = require("./controleESRoutes");
const controleFrotaRoutes = require("./controleFrotaRoutes");

router.get("/health", healthCheck);
router.use("/", usuarioRoutes);
router.use("/", veiculoRoutes);
router.use("/", pessoaRoutes);
router.use("/", controleESRoutes);
router.use("/", controleFrotaRoutes);

module.exports = router;
