const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/healthController");
const usuarioRoutes = require("./usuarioRoutes");

router.get("/health", healthCheck);
router.use("/", usuarioRoutes);

module.exports = router;
