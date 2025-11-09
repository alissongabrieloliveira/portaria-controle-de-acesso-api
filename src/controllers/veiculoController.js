const { listarVeiculos } = require("../models/veiculoModel");

// GET lista todos os veículos
async function listar(req, res) {
  try {
    const veiculos = await listarVeiculos();
    res.status(200).json({ veiculos });
  } catch (err) {
    console.error("Erro ao buscar veículos:", err);
    res.status(500).json({ error: "Erro ao buscar veículos." });
  }
}

module.exports = {
  listar,
};
