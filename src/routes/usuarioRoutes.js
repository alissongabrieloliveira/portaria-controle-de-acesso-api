const express = require("express");
const router = express.Router();
const { registrar, login } = require("../controllers/usuarioController");

// Rotas publicas
router.post("/registro-usuarios", registrar);
router.post("/login", login);

module.exports = router;
