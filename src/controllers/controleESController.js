const { listarMovimentacoes } = require("../models/controleESModel");

// GET lista todas as movimentações
async function listar(req, res) {
  try {
    const movimentacoes = await listarMovimentacoes();
    res.status(200).json({ movimentacoes });
  } catch (err) {
    console.error("Erro ao listar movimentações:", err);
    res.status(500).json({ error: "Erro ao buscar movimentações." });
  }
}

module.exports = {
  listar,
};
