const { listarMovimentacoesFrota } = require("../models/controleFrotaModel");

// GET lista todas as movimentações da frota
async function listar(req, res) {
  try {
    const movimentacoes = await listarMovimentacoesFrota();
    res.status(200).json({ movimentacoes });
  } catch (err) {
    console.error("Erro ao listar movimentações da frota:", err);
    res.status(500).json({ error: "Erro ao buscar movimentações da frota." });
  }
}

module.exports = {
  listar,
};
