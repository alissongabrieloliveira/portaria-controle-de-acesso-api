const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/healthController");
const usuarioRoutes = require("./usuarioRoutes");
const veiculoRoutes = require("./veiculoRoutes");

router.get("/health", healthCheck);
router.use("/", usuarioRoutes);
router.use("/", veiculoRoutes);

module.exports = router;
